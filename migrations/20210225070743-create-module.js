"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("modules", {
      sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      module_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.UUID,
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
    await queryInterface.dropTable("modules");
  },
};
