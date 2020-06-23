import { gql } from "../../dependencies/graphql.js";
const picture = gql`
  type Picture {
    uuid: String
    name: String
    extension: String
    path: String
  }
`;

export { picture };
