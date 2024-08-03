import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const uploadImageBerita = multer({
  storage: storageBerita,
}).single("gambarBerita");

export const uploadImageKatalog = multer({
  storage: storageKatalog,
}).single("gambarKatalog");

export const uploadImageDakwah = multer({
  storage: storageDakwah,
}).single("gambarDakwah");