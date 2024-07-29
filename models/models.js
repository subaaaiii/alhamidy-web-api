"use_strict";
import { Sequelize } from "sequelize";
import db from "../config/database.js";

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
          "image"
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
