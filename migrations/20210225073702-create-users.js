"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      package: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      payment_status: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      razorpay_subscription_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      charge_date: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      capture_status: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      from_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_now: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("users");
  },
};
