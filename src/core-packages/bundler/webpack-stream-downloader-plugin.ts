import Webpack, { Compiler, Compilation } from "webpack";
import { Readable } from "stream";

interface Streamable {
  id: string;
  stream: Readable;
}

function readStream(stream: Readable) {
  const buf: Array<any> = [];
  return new Promise<Buffer>((res, rej) => {
    stream
      .on("error", (err) => {
        console.log("ERRORRRRR");
        rej(err);
      })
      .on("data", (chunk) => buf.push(chunk))
      .on("end", () => res(Buffer.concat(buf)));
  });
}

const pluginName = "StreamDownloaderPlugin";
export class StreamDownloaderPlugin {
  private files: Array<Streamable>;
  private streams: Array<{ id: string; buf: Buffer }> | null;
  constructor(files: Streamable[]) {
    this.files = files;
    this.streams = null;
  }

  private async readStreams() {
    if (this.streams === null) {
      this.streams = await Promise.all(
        this.files.map(async ({ id, stream }) => ({
          id,
          buf: await readStream(stream)
        }))
      );
    }

    return this.streams;
  }

  private async run(compilation: Compilation) {
    await Promise.all(
      (
        await this.readStreams()
      ).map(async ({ id, buf }) => {
        try {
          console.log(id, "length:", buf.length);
          compilation.emitAsset(
            `public/${id}.jpeg`,
            new Webpack.sources.RawSource(buf, false)
          );
        } catch (e) {
          console.log("Cannot add dynamic assets");
        }
      })
    );
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(pluginName, async (compilation) => {
      console.log("tapping", pluginName);
      compilation.hooks.processAssets.tapPromise(
        {
          name: "webpack-stream-downloader-plugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
        async () => this.run(compilation)
      );
    });
  }
}
