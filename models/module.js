"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Course }) {
      // define association here
      this.belongsTo(Course, { foreignKey: "course_id" });
    }
  }
  Module.init(
    {
      //s.no vs sno
      sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      module_part: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      module_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      module_desc: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      module_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      module_browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      module_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "modules",
      modelName: "Module",
    }
  );
  return Module;
};
