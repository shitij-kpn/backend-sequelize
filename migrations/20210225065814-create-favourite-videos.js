"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("favourite_videos", {
      favourite_videos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_key: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING(1000),
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(1000),
        defaultValue: null,
      },
      published_at: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      thumbnail: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      playlist_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      course_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      module_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      chapter_part: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      episode: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("favourite_videos");
  },
};
