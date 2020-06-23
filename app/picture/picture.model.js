import { Model, DataTypes, Relationships } from "../../dependencies/denodb.js";
import { Item } from "../item/item.model.js";

class Picture extends Model {
  static table = "pictures";
  static timestamps = true;

  static fields = {
    _id: {
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      unique: true,
    },
    itemId: Relationships.belongsTo(Item),
    name: DataTypes.STRING,
    extension: DataTypes.STRING,
    path: DataTypes.STRING,
  };

  static item() {
    return this.hasOne(Item);
  }
}

export { Picture };
