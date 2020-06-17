const queries = {
  categories: (root, args, { db }) => db.Category.all(),
};

export { queries };
