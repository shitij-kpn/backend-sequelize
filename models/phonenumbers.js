"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhoneNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        from_ip: undefined,
        from_device: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  PhoneNumbers.init(
    {
      phonenumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      from_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_device: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamp: false,
      tableName: "phonenumbers",
      modelName: "PhoneNumbers",
    }
  );
  return PhoneNumbers;
};
