import { createDataFolder, getFilePath } from "./src/data-folder";
import GoogleAdapter from "./src/google-adapter";

export default async function sync() {
  const { getImages, download } = GoogleAdapter();

  await createDataFolder();

  const images = await getImages();
  images.forEach(async (file) => {
    await download(file.id, getFilePath(`images/${file.name}`));
    console.log(`Downloaded Image ${file.name}`);
  });
}
