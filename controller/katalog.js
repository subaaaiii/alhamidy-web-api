import { Katalog } from "../models/models.js";
import { Url } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getKatalog = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      [Op.or]: [],
    };

    if (search) {
      query[Op.or].push(
        { nama: { [Op.like]: `%${search}%` } },
        { kategori: { [Op.like]: `%${search}%` } }
      );
    }

    let katalog;
    if (search) {
      katalog = await Katalog.findAll({ where: query });
    } else {
      katalog = await Katalog.findAll();
    }

    res.status(201).json({
      msg: "Berhasil Mengambil Semua Data Katalog",
      data: katalog,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getKatalogByCategories = async (req, res) => {
  try {
    const { kategori } = req.params;
    console.log(kategori);
    const katalog = await Katalog.findAll({
      where: {
        kategori: kategori,
      },
    });
    if (katalog.length > 0) {
      res.status(201).json({
        msg: "Berhasil Mendapatkan Katalog Berdasarkan Kategori",
        data: katalog,
      });
    } else {
      res.status(404).json({
        message: `Katalog Dengan Kategori ${kategori} Tidak Ditemukan`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getKatalogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const katalog = await Katalog.findAll({
      where: {
        id: id,
      },
    });
    if (katalog.length > 0) {
      res.status(201).json({
        msg: "Berhasil Mendapatkan Katalog Berdasarkan Kategori",
        data: katalog,
      });
    } else {
      res
        .status(404)
        .json({ message: `Katalog Dengan Id ${id} Tidak Ditemukan` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const postKatalog = async (req, res) => {
  try {
    const { nama, harga, kategori } = req.body;
    const image = req.file;
    let gambarKatalog;
    if (image) {
      gambarKatalog = image.filename;
    } else gambarKatalog = "noimage.png";

    if (
      !nama ||
      !nama.trim() ||
      !harga ||
      !harga.trim() ||
      !kategori ||
      !kategori.trim()
    ) {
      return res.status(400).json({ msg: "Kolom Masukan Tidak Boleh Kosong" });
    }
    const katalog = await Katalog.create({
      gambar: gambarKatalog,
      nama,
      harga,
      kategori,
    });
    res.status(201).json({ msg: "Produk Berhasil Ditambahkan", data: katalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateKatalog = async (req, res) => {
  try {
    const { nama, harga, kategori } = req.body;
    const image = req.file;
    const id = req.params.id;
    let gambarKatalog;
    const imageBeforeUpdate = await Katalog.findOne({
      attributes: ["gambar"],
      where: {
        id: id,
      },
    });
    if (image) {
      gambarKatalog = image.filename;
    } else {
      gambarKatalog = imageBeforeUpdate.gambar;
    }
    const katalog = await Katalog.findByPk(id);
    if (katalog) {
      await Katalog.update(
        {
          gambar: gambarKatalog,
          nama,
          harga,
          kategori,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (image && imageBeforeUpdate.gambar != "noimage.png") {
        fs.unlinkSync("images/katalog/" + imageBeforeUpdate.gambar);
      }
      res.status(201).json({
        message: "Berhasil Mengubah Produk",
        data: katalog,
      });
    } else {
      res.status(404).json({ msg: "Produk Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteKatalog = async (req, res) => {
  try {
    const { id } = req.params;
    const katalog = await Katalog.findByPk(id);
    if (katalog) {
      if (katalog.gambar && katalog.gambar !== "noimage.png") {
        const imagePath = path.join(
          __dirname,
          "..",
          "images",
          "katalog",
          katalog.gambar
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await Katalog.destroy({
        where: { id },
      });

      res.status(200).json({ message: "Katalog Terhapus" });
    } else {
      res.status(404).json({ message: "Katalog Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
