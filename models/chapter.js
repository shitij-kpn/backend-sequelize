"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chapter.init(
    {
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_part: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video_src_180: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      video_src_270: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      video_src_360: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      video_src_540: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      video_src_720: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      subtitles: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapter_desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapter_thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapter_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapter_browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapter_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "chapter",
      modelName: "Chapter",
    }
  );
  return Chapter;
};
