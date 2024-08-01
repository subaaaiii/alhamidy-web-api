import { Dakwah } from "../models/models.js";
import { Url } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const postDakwah = async (req, res) => {
  try {
    const { judul, kategori, konten } = req.body;
    const image = req.file;
    let gambarDakwah;
    if (image) {
      gambarDakwah = image.filename;
    } else gambarDakwah = "noimage.png";

    if (
      !judul ||
      !judul.trim() ||
      !kategori ||
      !kategori.trim() ||
      !konten ||
      !konten.trim()
    ) {
      return res.status(400).json({ msg: "Kolom Masukan Tidak Boleh Kosong" });
    }

    const dakwah = await Dakwah.create({
      judul,
      kategori,
      gambar: gambarDakwah,
      konten,
    });
    res.status(201).json({
      msg: "Dakwah berhasil ditambahkan",
      data: dakwah,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};

export const updateDakwah = async (req, res) => {
  try {
    const { judul, kategori, konten } = req.body;
    const image = req.file;
    const { id } = req.body;
    let gambarDakwah;
    const imageBeforeUpdate = await Dakwah.findOne({
      attributes: ["gambar"],
      where: {
        id: id,
      },
    });
    if (image) {
      gambarDakwah = image.filename;
    } else {
      gambarDakwah = imageBeforeUpdate.gambar;
    }
    const dakwah = await Dakwah.findByPk(id);
    if (dakwah) {
      await Dakwah.update(
        {
          judul,
          kategori,
          gambar: gambarDakwah,
          konten,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (image && imageBeforeUpdate.gambar != "noimage.png") {
        fs.unlinkSync("images/dakwah/" + imageBeforeUpdate.gambar);
      }
      res.status(201).json({
        message: "Berhasil Mengubah Konten Dakwah",
        data: dakwah,
      });
    } else {
      res.status(404).json({ msg: "Dakwah Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDakwah = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const dakwah = await Dakwah.findByPk(id);
    if (dakwah) {
      if (dakwah.gambar && dakwah.gambar !== "noimage.png") {
        const imagePath = path.join(
          __dirname,
          "..",
          "images",
          "dakwah",
          dakwah.gambar
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await Dakwah.destroy({
        where: { id },
      });

      res.status(200).json({ message: "Dakwah Terhapus" });
    } else {
      res.status(404).json({ message: "Dakwah Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDakwah = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      [Op.or]: []
    };

    if (search) {
      query[Op.or].push(
        { judul: { [Op.like]: `%${search}%` } },
        { kategori: { [Op.like]: `%${search}%` } }
      );
    }
    
    let dakwah;
    if (search) {
      dakwah = await Dakwah.findAll({ where: query });
    } else {
      dakwah = await Dakwah.findAll();
    }

    res.status(200).json({
      msg: "Berhasil Mengambil Semua Data Dakwah",
      data: dakwah,
    });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getDakwahByCategories = async (req, res) => {
  try {
    const { kategori } = req.params;
    console.log(kategori);
    const dakwah = await Dakwah.findAll({
      where: {
        kategori: kategori,
      },
    });
    if (dakwah.length > 0) {
      res.status(201).json({
        msg: "Berhasil Mendapatkan Dakwah Berdasarkan Kategori",
        data: dakwah,
      });
    } else {
      res.status(404).json({
        message: `Dakwah Dengan Kategori ${kategori} Tidak Ditemukan`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getDakwahById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const dakwah = await Dakwah.findAll({
      where: {
        id: id,
      },
    });
    if (dakwah.length > 0) {
      res.status(201).json({
        msg: "Berhasil Mendapatkan Dakwah Berdasarkan Kategori",
        data: dakwah,
      });
    } else {
      res
        .status(404)
        .json({ message: `Dakwah Dengan Id ${id} Tidak Ditemukan` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
