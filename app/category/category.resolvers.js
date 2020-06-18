const queries = {
  categories: (root, args, { db }) => db.Category.all(),
  category: (root, { uuid }, { db }) => db.Category.where("uuid", uuid).first(),
};

const mutations = {
  createCategory: async (root, { title }, { db, uuidV4Generator }) => {
    const uuid = uuidV4Generator.generate();
    const [{ createdAt }] = await db.Category.create({ uuid, title });

    return {
      uuid,
      title,
      createdAt,
    };
  },
  deleteCategory: (root, { uuid }, { db }) =>
    db.Category.where("uuid", uuid).delete(),
  updateCategory: async (root, { uuid, title }, { db }) => {
    await db.Category.where("uuid", uuid).update({ title });
    return db.Category.where("uuid", uuid).first();
  },
};

export { queries, mutations };
