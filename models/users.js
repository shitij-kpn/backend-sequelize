"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
    }
  );
  return Users;
};
