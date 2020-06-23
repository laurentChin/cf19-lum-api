import { gql } from "../../dependencies/graphql.js";
const set = gql`
  type Set {
    uuid: String
    title: String
    createdAt: String
    updatedAt: String
  }

  type SetLight {
    uuid: String
    title: String
    updatedAt: String
  }
`;

export { set };
