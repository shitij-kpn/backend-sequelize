"use strict";
module.exports = {
  up: async (queryInterface, DataType) => {
    await queryInterface.createTable("otp", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
      },
      phonenumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE,
      },
    });
  },
  down: async (queryInterface, DataType) => {
    await queryInterface.dropTable("otp");
  },
};
