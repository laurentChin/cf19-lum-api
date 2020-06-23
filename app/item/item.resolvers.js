import { fs } from "../../dependencies/std.js";

import { dataURLtoBlob } from "../utils/converter.js";

const queries = {
  items: (root, args, { db }) => db.Item.all(),
};

const mutations = {
  createItem: async (
    root,
    { title, categoryUuid, picture },
    { db, uuidV4Generator, uploadDirectory }
  ) => {
    const uuid = uuidV4Generator.generate();
    const category = await db.Category.where({ uuid: categoryUuid }).first();
    const [{ _id, createdAt }] = await db.Item.create({
      uuid,
      categoryId: category._id,
      title,
    });

    let pictureResult = {};

    if (picture.name) {
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
      pictureResult = {
        name: picture.name,
        extension: picture.extension,
        path: picturePath,
      };
    }

    return {
      uuid,
      title,
      category,
      createdAt,
      picture: pictureResult,
    };
  },
};

export { queries, mutations };
