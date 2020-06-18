const queries = {
  categories: (root, args, { db }) => db.Category.all(),
  category: (root, { uuid }, { db }) => db.Category.where("uuid", uuid).first(),
};

export { queries };
