"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("modules", {
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("modules");
  },
};
