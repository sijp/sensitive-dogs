import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

import { processData } from "../../packages/data-processor";

/**
 * Minimal Vite config for core-packages/ssg.
 *
 * NOTE: All build-time processData / data-inlining logic has been removed
 * from this config per your request. Handle data processing / inlining
 * outside of the Vite config (prebuild step, wrapper script, env injection, etc.).
 */

const defaultAppRelative = "../../src";
const appRoot = process.env.SSG_APP_ROOT
  ? path.resolve(__dirname, process.env.SSG_APP_ROOT)
  : path.resolve(__dirname, defaultAppRelative);

const indexHtmlPath = path.resolve(appRoot, "index.html");

export default defineConfig(async () => {
  // Fail fast if the app root is misconfigured
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(
      `core-ssg: index.html not found at resolved app root: ${indexHtmlPath}\n` +
        `Set SSG_APP_ROOT relative to core-packages/ssg (example: SSG_APP_ROOT=../../packages/app).`
    );
  }

  // dynamically import @vitejs/plugin-react (ESM-only) if available
  const reactPkg = await import("@vitejs/plugin-react").catch(() => null);
  const react = reactPkg && (reactPkg.default || reactPkg);

  const { images, ...data } = await processData();

  return {
    root: appRoot,
    plugins: react ? [react()] : [],
    define: {
      "process.env.__DATA__": JSON.stringify(data)
    },
    resolve: {
      alias: {
        "@app": appRoot
      }
    },
    // Serve static assets from the app's public folder if present
    publicDir: path.resolve(appRoot, "public"),
    server: {
      port: 3000,
      open: false,
      fs: {
        // allow serving files from the app root (outside this package)
        allow: [appRoot, path.resolve(__dirname)]
      }
    },
    build: {
      // keep build artifacts inside this package so ssg remains self-contained
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      sourcemap: true
    }
  };
});
