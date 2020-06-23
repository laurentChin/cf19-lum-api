const queries = {};

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
