"use_strict";
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import moment from "moment-timezone";
import dotenv from "dotenv";
dotenv.config();

const { APP_API_BASE } = process.env;

const { DataTypes } = Sequelize;

export const Berita = db.define(
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

export const Katalog = db.define(
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

export const Dakwah = db.define(
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
