const multer = require("multer");
const path = require("path");
const fs = require("fs");


const storageBerita = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../images/berita");
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

const storageKatalog = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../images/katalog");
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

const storageDakwah = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../images/dakwah");
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

const uploadImageBerita = multer({
  storage: storageBerita,
}).single("gambarBerita");

const uploadImageKatalog = multer({
  storage: storageKatalog,
}).single("gambarKatalog");

const uploadImageDakwah = multer({
  storage: storageDakwah,
}).single("gambarDakwah");

module.exports = {
  uploadImageDakwah,
  uploadImageKatalog,
  uploadImageBerita
};