import { Model, DataTypes } from "../../dependencies/denodb.js";

class Set extends Model {
  static table = "sets";
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

export { Set };
