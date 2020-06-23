import { gql } from "../../dependencies/graphql.js";
const category = gql`
  type Category {
    uuid: String
    title: String
    createdAt: String
    updatedAt: String
    items: [ItemLight]
  }

  type CategoryLight {
    uuid: String
    title: String
    updatedAt: String
  }
`;

export { category };
