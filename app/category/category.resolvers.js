const queries = {
  categories: (root, args, { db }) => db.Category.all(),
  category: (root, { uuid }, { db }) => db.Category.where("uuid", uuid).first(),
};

const mutations = {
  createCategory: (root, { title }, { db, uuidV4Generator }) => {
    const uuid = uuidV4Generator.generate();

    return db.Category.create({ uuid, title });
  },
  deleteCategory: (root, { uuid }, { db }) =>
    db.Category.where("uuid", uuid).delete(),
};

export { queries, mutations };
