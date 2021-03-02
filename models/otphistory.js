"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OTPHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OTPHistory.init(
    {
      phonenumber: {
        type: DataTypes.BIGINT,
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
      route: {
        type: DataTypes.ENUM({
          values: ["register", "login"],
        }),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "otphistory",
      modelName: "OTPHistory",
    }
  );
  return OTPHistory;
};
