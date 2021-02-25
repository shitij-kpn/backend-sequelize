"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite_videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favourite_videos.init(
    {
      favourite_videos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_key: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING(1000),
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(1000),
        defaultValue: null,
      },
      published_at: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      thumbnail: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      playlist_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      course_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      module_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      chapter_part: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      episode: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "favourite_videos",
      modelName: "Favourite_videos",
    }
  );
  return Favourite_videos;
};
