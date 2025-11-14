import type { Plugin } from "vite";
import type { Readable } from "stream";

interface Streamable {
  id: string;
  stream: Readable;
}

/**
 * Minimal no-op readStream — keep your real implementation here.
 */
async function readStream(stream: Readable): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as any) {
    chunks.push(
      typeof chunk === "string"
        ? new Uint8Array(Buffer.from(chunk))
        : new Uint8Array(chunk)
    );
  }
  return Buffer.concat(chunks) as Uint8Array;
}

export function streamDownloaderPlugin(files: Streamable[] = []): Plugin {
  const streamCache = new Map<string, Uint8Array>();
  let initialized = false;

  // middleware we want to ensure runs early
  const assetMiddleware = (req: any, res: any, next: any) => {
    try {
      const rawUrl = req && req.url ? req.url.split("?")[0] : "";
      // quick diagnostic log
      // Comment out the next line after debugging
      console.log("[stream-plugin] middleware url:", rawUrl);

      if (!rawUrl) return next();

      // Serve either /public/<id> or /<id>
      let id: string | undefined;
      if (rawUrl.startsWith("/public/")) id = rawUrl.slice("/public/".length);
      else if (rawUrl.startsWith("/")) id = rawUrl.slice(1);

      if (!id) return next();

      const buf = streamCache.get(id);
      if (buf) {
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Length", buf.length);
        res.end(Buffer.from(buf));
        return;
      }
    } catch (err) {
      console.error("[stream-plugin] middleware error", err);
    }
    next();
  };

  return {
    name: "vite-stream-downloader-plugin",

    async load(id) {
      if (id.startsWith("virtual-asset:")) {
        const assetId = id.replace("virtual-asset:", "");
        // return a URL so the browser requests /logo.png
        return `export default "/${assetId}"`;
      }
    },

    buildStart() {
      console.log("[stream-plugin] buildStart");
    },

    async configResolved(config) {
      console.log("[stream-plugin] configResolved. mode=", config.mode);
      // read streams once during dev/build start
      if (!initialized) {
        initialized = true;
        for (const f of files) {
          try {
            const buf = await readStream(f.stream);
            streamCache.set(f.id, buf);
            console.log(
              `[stream-plugin] cached asset ${f.id} (${buf.length} bytes)`
            );
          } catch (e) {
            console.warn("[stream-plugin] failed reading stream for", f.id, e);
          }
        }
      }
    },

    configureServer(server) {
      console.log("[stream-plugin] configureServer called");

      // Raw request listener to confirm requests reach the server (runs earlier than connect middlewares).
      // This is purely diagnostic — remove or comment out after debugging.
      server.httpServer?.on("request", (req, res) => {
        // every incoming request will log here
        // Comment this out if too noisy
        // console.log('[stream-plugin] raw request:', req.url);
      });

      // Attach middleware normally
      server.middlewares.use(assetMiddleware);

      // Ensure our middleware runs early: move the last added layer to the front of the stack
      // This manipulates internal connect stack (not officially typed), but is commonly used
      try {
        const stack = (server as any).middlewares?.stack;
        if (Array.isArray(stack) && stack.length) {
          // pop the last pushed layer and move to the beginning
          const layer = stack.pop();
          stack.unshift(layer);
          console.log("[stream-plugin] moved middleware to front of stack");
        } else {
          console.log(
            "[stream-plugin] no stack access, middleware added normally"
          );
        }
      } catch (err) {
        console.warn("[stream-plugin] unable to reorder middleware stack", err);
      }
    },

    generateBundle(_options, bundle) {
      // Example: add cache entries to the production bundle as assets
      for (const [id, buf] of streamCache.entries()) {
        const fileName = `public/${id}`;
        // Add minimal asset object — Vite/Rollup accepts this shape at runtime.
        bundle[fileName] = {
          type: "asset",
          fileName,
          source: buf
        } as any;
      }
    }
  };
}
