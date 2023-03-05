import { mkdir, writeFile } from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";

import { Readable } from "stream";

export async function createDataFolder() {
  await mkdir("./data/images", { recursive: true });
  await mkdir("./data/articles", { recursive: true });
}

export async function writeFileFromStream(stream: Readable, target: string) {
  const dest = createWriteStream(target);

  return new Promise((res, rej) => {
    stream
      .on("end", () => {
        res(true);
      })
      .on("error", (error) => {
        rej(error);
      })
      .pipe(dest);
  });
}

export function getFilePath(relPath: string) {
  return path.join("./data/", relPath);
}
