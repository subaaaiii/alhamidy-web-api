import { Berita } from "../models/models.js";

export const postBerita = async (req, res) => {
  try {
    const { penulis, judul, kategori, konten } = req.body;
    const image = req.file;
    console.log(image);
    let gambar;
    if (image) {
      gambar = image.filename;
    } else gambar = "noimage.png";

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
      gambar,
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