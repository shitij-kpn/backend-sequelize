"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init(
    {
      course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_desc: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      course_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "course",
      modelName: "Course",
    }
  );
  return Course;
};
