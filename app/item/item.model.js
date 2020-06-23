import { Model, DataTypes, Relationships } from "../../dependencies/denodb.js";
import { Category } from "../category/category.model.js";

class Item extends Model {
  static table = "items";
  static timestamps = true;

  static fields = {
    _id: {
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      unique: true,
    },
    categoryId: Relationships.belongsTo(Category),
    title: DataTypes.STRING,
  };

  static category() {
    return this.hasOne(Category);
  }
}

export { Item };
