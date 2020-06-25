import { queries as pictureQueries } from "../picture/picture.resolvers.js";
import { queries as categoryQueries } from "../category/category.resolvers.js";

import {
  createPictureFromFile,
  deletePicture,
} from "../picture/picture.helpers.js";

const queries = {
  items: (root, args, { db }) => db.Item.all(),
  item: async (root, { uuid }, { db }) => {
    const {
      _id,
      title,
      createdAt,
      updatedAt,
      categoryId,
    } = await db.Item.where("uuid", uuid).first();

    return {
      uuid,
      title,
      createdAt,
      updatedAt,
      picture: await pictureQueries.picture(root, { itemUuid: _id }, { db }),
      category: await categoryQueries.category(
        root,
        { _id: categoryId },
        { db }
      ),
    };
  },
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
      pictureResult = await createPictureFromFile({
        db,
        picture,
        _id,
        uploadDirectory,
        uuidV4Generator,
      });
    }

    return {
      uuid,
      title,
      category,
      createdAt,
      picture: pictureResult,
    };
  },
  updateItem: async (
    root,
    { uuid, title, categoryUuid, picture },
    { db, uploadDirectory, uuidV4Generator }
  ) => {
    try {
      let item = await db.Item.where("uuid", uuid).first();

      const updatePayload = {};

      if (title) {
        updatePayload.title = title;
      }

      if (picture.name) {
        const oldPicture = await db.Item.where("_id", item._id).picture();
        await deletePicture(
          db,
          oldPicture._id,
          `${uploadDirectory}/${oldPicture.path}`
        );

        await createPictureFromFile({
          db,
          picture,
          _id: item._id,
          uploadDirectory,
          uuidV4Generator,
        });
      }

      if (categoryUuid) {
        const category = await db.Category.where("uuid", categoryUuid).first();
        updatePayload.categoryId = category._id;
      }

      await db.Item.where("uuid", uuid).update(updatePayload);

      return await db.Item.where("uuid", uuid).first();
    } catch ({ message }) {
      return {
        message,
      };
    }
  },
};

export { queries, mutations };
