"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database.js");
const moment = require("moment-timezone");
const dotenv = require("dotenv");

dotenv.config();

const { APP_API_BASE } = process.env;

const Berita = db.define(
  "berita",
  {
    penulis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_link: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${APP_API_BASE}/images/berita/${this.getDataValue("gambar")}`;
      },
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
  }
);

const Katalog = db.define(
  "katalog",
  {
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_link: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${APP_API_BASE}/images/katalog/${this.getDataValue("gambar")}`;
      },
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
  }
);

const Dakwah = db.define(
  "dakwah",
  {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_link: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${APP_API_BASE}/images/dakwah/${this.getDataValue("gambar")}`;
      },
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
  }
);

module.exports = { Berita, Katalog, Dakwah };
