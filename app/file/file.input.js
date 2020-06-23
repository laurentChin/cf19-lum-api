import { gql } from "../../dependencies/graphql.js";
const file = gql`
  enum Extensions {
    JPG
    JPEG
    PNG
  }

  input File {
    name: String
    extension: Extensions
    data: String
  }
`;

export { file };
