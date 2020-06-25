import { fs } from "../../dependencies/std.js";
import { dataURLtoBlob } from "../utils/converter.js";

const createPictureFromFile = async ({
  db,
  picture,
  _id,
  uploadDirectory,
  uuidV4Generator,
}) => {
  const { name, extension, data } = picture;
  const pictureUuid = uuidV4Generator.generate();

  const [
    ,
    firstDirectory,
    secondDirectory,
  ] = /^([a-z0-9]{2})([a-z0-9]{2})/.exec(pictureUuid);

  const pictureDirectory = `${uploadDirectory}/${firstDirectory}/${secondDirectory}`;

  await fs.ensureDir(pictureDirectory);
  const picturePath = `${firstDirectory}/${secondDirectory}/${pictureUuid}.${extension}`;
  const arrayBuffer = await dataURLtoBlob(data).arrayBuffer();
  const uint8Array = new Deno.Buffer(arrayBuffer).bytes();
  await Deno.writeFile(
    `${pictureDirectory}/${pictureUuid}.${extension}`,
    uint8Array
  );

  await db.Picture.create({
    uuid: pictureUuid,
    name: name,
    path: picturePath,
    itemId: _id,
  });

  return {
    name: picture.name,
    extension: picture.extension,
    path: picturePath,
  };
};

const deletePicture = async (db, _id, path) => {
  await Deno.remove(path);
  await db.Picture.deleteById(_id);
};

export { createPictureFromFile, deletePicture };
