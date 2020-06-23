const queries = {
  sets: (root, args, { db }) => db.Set.all(),
  set: (root, { uuid }, { db }) => db.Set.where("uuid", uuid).first(),
};

const mutations = {
  createSet: async (root, { title }, { db, uuidV4Generator }) => {
    const uuid = uuidV4Generator.generate();
    const [{ createdAt }] = await db.Set.create({ uuid, title });

    return {
      uuid,
      title,
      createdAt,
    };
  },
};

export { queries, mutations };
