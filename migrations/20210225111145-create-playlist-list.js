"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("playlist_lists", {
      sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      playlist_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_standard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_max_res: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("playlist_lists");
  },
};
