import { Model, DataTypes, Relationships } from "../dependencies/denodb.js";

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

  static items() {
    return this.hasMany(Item);
  }
}

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

  static picture() {
    return this.hasOne(Picture);
  }
}

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
    name: DataTypes.STRING,
    extension: DataTypes.STRING,
    path: DataTypes.STRING,
  };

  static item() {
    return this.hasOne(Item);
  }
}

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

Relationships.oneToOne(Item, Picture);

export { Category, Item, Picture, Set };
