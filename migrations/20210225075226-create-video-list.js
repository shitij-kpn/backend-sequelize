"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("video_lists", {
      sno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      video_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      playlist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_standard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_maxres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_at: {
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
    await queryInterface.dropTable("video_lists");
  },
};
