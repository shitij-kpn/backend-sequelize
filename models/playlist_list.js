"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Playlist_list.init(
    {
      sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      playlist_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_standard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_max_res: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "playlist_list",
      modelName: "Playlist_list",
    }
  );
  return Playlist_list;
};
