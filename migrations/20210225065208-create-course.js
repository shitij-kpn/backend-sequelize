"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("courses", {
      course_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("courses");
  },
};
