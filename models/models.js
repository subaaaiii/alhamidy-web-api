"use_strict";
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import moment from "moment-timezone";

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
        return `http://localhost:5000/images/berita/${this.getDataValue(
          "gambar"
        )}`;
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
        return `http://localhost:5000/images/katalog/${this.getDataValue(
          "gambar"
        )}`;
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