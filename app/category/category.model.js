import { Model, DataTypes } from "../../dependencies/denodb.js";

class Category extends Model {
  static table = "categories";
  static timestamps = true;

  static fields = {
    _id: {
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      unique: true,
    },
    title: DataTypes.STRING,
  };
}

export { Category };
