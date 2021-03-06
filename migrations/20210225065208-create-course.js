"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("courses", {
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("courses");
  },
};
