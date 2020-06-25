import { gql } from "../dependencies/graphql.js";
import { category } from "./category/category.types.js";
import { item } from "./item/item.types.js";
import { picture } from "./picture/picture.type.js";
import { file } from "./file/file.input.js";
import { set } from "./set/set.type.js";

const types = gql`
  type Error {
    code: Int
    message: String
  }

  ${category}
  ${item}
  ${picture}
  ${file}
  ${set}
  type Query {
    categories: [CategoryLight]
    category(uuid: String): Category
    items: [ItemLight]
    item(uuid: String): Item
    picture(itemUuid: String): Picture
    sets: [SetLight]
    set(uuid: String): Set
  }

  type Mutation {
    createCategory(title: String): Category
    deleteCategory(uuid: String): [Boolean]
    updateCategory(uuid: String, title: String): Category
    createItem(
      categoryUuid: String
      title: String
      picture: File
    ): CreateItemResult
    updateItem(
      uuid: String
      title: String
      picture: File
      categoryUuid: String
    ): UpdateItemResult
    createSet(title: String): Set
  }
`;
export default types;
