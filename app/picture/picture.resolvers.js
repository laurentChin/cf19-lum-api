const queries = {
  picture: async (root, { itemUuid }, { db }) => {
    const picture = await db.Picture.where({ itemId: itemUuid }).first();

    return {
      name: picture.name,
      path: picture.path,
    };
  },
};

export { queries };
