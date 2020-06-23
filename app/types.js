import { gql } from "../dependencies/graphql.js";
import { category } from "./category/category.type.js";
import { item } from "./item/item.type.js";
import { picture } from "./picture/picture.type.js";
import { file } from "./file/file.input.js";
import { set } from "./set/set.type.js";

const types = gql`
  ${category}
  ${item}
  ${picture}
  ${file}
  ${set}
  type Query {
    categories: [Category]
    category(uuid: String): Category
    items: [Item]
    item(uuid: String): Item
    picture(itemUuid: String): Picture
    sets: [Set]
    set(uuid: String): Set
  }

  type Mutation {
    createCategory(title: String): Category
    deleteCategory(uuid: String): [Boolean]
    updateCategory(uuid: String, title: String): Category
    createItem(categoryUuid: String, title: String, picture: File): Item
    createSet(title: String): Set
  }
`;
export default types;
