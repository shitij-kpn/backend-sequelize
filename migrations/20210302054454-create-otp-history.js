"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("otphistory", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      phonenumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      route: {
        type: DataTypes.ENUM({
          values: ["register", "login"],
        }),
        allowNull: false,
      },
      from_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_device: {
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
    await queryInterface.dropTable("otphistory");
  },
};
