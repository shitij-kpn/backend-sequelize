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
        type: DataType.BIGINT,
        allowNull: false,
      },
      otp: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, DataType) => {
    await queryInterface.dropTable("otp");
  },
};
