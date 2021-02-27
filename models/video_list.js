"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video_list.init(
    {
      sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      video_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      playlist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_standard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_maxres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "video_lists",
      modelName: "Video_lists",
    }
  );
  return Video_list;
};
