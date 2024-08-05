const { Berita } = require("../models/models.js");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");



// Controller Functions
const postBerita = async (req, res) => {
  try {
    const { penulis, judul, kategori, konten } = req.body;
    const image = req.file;
    let gambarBerita;
    if (image) {
      gambarBerita = image.filename;
    } else gambarBerita = "noimage.png";

    if (
      !penulis ||
      !penulis.trim() ||
      !judul ||
      !judul.trim() ||
      !kategori ||
      !kategori.trim() ||
      !konten ||
      !konten.trim()
    ) {
      return res.status(400).json({ msg: "Kolom Masukan Tidak Boleh Kosong" });
    }

    const berita = await Berita.create({
      penulis,
      judul,
      kategori,
      gambar: gambarBerita,
      konten,
    });
    res.status(201).json({
      msg: "Berita berhasil ditambahkan",
      data: berita,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};

const updateBerita = async (req, res) => {
  try {
    const { penulis, judul, kategori, konten } = req.body;
    const image = req.file;
    const id = req.params.id;
    let gambarBerita;
    const imageBeforeUpdate = await Berita.findOne({
      attributes: ["gambar"],
      where: {
        id: id,
      },
    });
    if (image) {
      gambarBerita = image.filename;
    } else {
      gambarBerita = imageBeforeUpdate.gambar;
    }
    const berita = await Berita.findByPk(id);
    if (berita) {
      await Berita.update(
        {
          penulis,
          judul,
          kategori,
          gambar: gambarBerita,
          konten,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (image && imageBeforeUpdate.gambar != "noimage.png") {
        fs.unlinkSync(path.join(__dirname, "..", "images", "berita", imageBeforeUpdate.gambar));
      }
      res.status(201).json({
        message: "Berhasil Mengubah Berita",
        data: berita,
      });
    } else {
      res.status(404).json({ msg: "Berita Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBerita = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const berita = await Berita.findByPk(id);
    if (berita) {
      if (berita.gambar && berita.gambar !== "noimage.png") {
        const imagePath = path.join(
          __dirname,
          "..",
          "images",
          "berita",
          berita.gambar
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await Berita.destroy({
        where: { id },
      });

      res.status(200).json({ message: "Berita Terhapus" });
    } else {
      res.status(404).json({ message: "Berita Tidak Ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBerita = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      [Op.or]: [],
    };

    if (search) {
      query[Op.or].push(
        { penulis: { [Op.like]: `%${search}%` } },
        { judul: { [Op.like]: `%${search}%` } },
        { kategori: { [Op.like]: `%${search}%` } }
      );
    }

    let berita;
    if (search) {
      berita = await Berita.findAll({ where: query });
    } else {
      berita = await Berita.findAll();
    }

    res.status(200).json({
      msg: "Berhasil Mengambil Semua Data Berita",
      data: berita,
    });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getBeritaByCategories = async (req, res) => {
  try {
    const { kategori } = req.params;
    console.log(kategori);
    const berita = await Berita.findAll({
      where: {
        kategori: kategori,
      },
    });
    if (berita.length > 0) {
      res.status(201).json({
        msg: "Berhasil Mendapatkan Berita Berdasarkan Kategori",
        data: berita,
      });
    } else {
      res.status(404).json({
        message: `Berita Dengan Kategori ${kategori} Tidak Ditemukan`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getBeritaById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const berita = await Berita.findAll({
      where: {
        id: id,
      },
    });
    if (berita.length > 0) {
      res.status(201).json({
        msg: "Berhasil Mendapatkan Berita Berdasarkan Id",
        data: berita,
      });
    } else {
      res
        .status(404)
        .json({ message: `Berita Dengan Id ${id} Tidak Ditemukan` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  postBerita,
  updateBerita,
  deleteBerita,
  getBerita,
  getBeritaByCategories,
  getBeritaById,
};
