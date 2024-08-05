const express = require('express');
const {
  getBerita,
  getBeritaById,
  deleteBerita,
  getBeritaByCategories,
  postBerita,
  updateBerita,
} = require('../controller/berita.js');
const {
  deleteKatalog,
  getKatalogByCategories,
  getKatalogById,
  getKatalog,
  postKatalog,
  updateKatalog,
} = require('../controller/katalog.js');
const {
  getDakwah,
  getDakwahById,
  getDakwahByCategories,
  postDakwah,
  updateDakwah,
  deleteDakwah,
} = require('../controller/dakwah.js');
const {
  uploadImageKatalog,
  uploadImageBerita,
  uploadImageDakwah,
} = require('../middleware/multer.js');
const { loginUser } = require('../middleware/login.js');

const router = express.Router();


router.post("/cms/login", loginUser)
router.get("/berita", getBerita);
router.get("/berita/:id", getBeritaById);
router.get("/berita/kategori/:kategori", getBeritaByCategories);
router.post("/berita", uploadImageBerita, postBerita);
router.patch("/berita/:id", uploadImageBerita, updateBerita);
router.delete("/berita/:id", deleteBerita);

router.get("/katalog", getKatalog);
router.get("/katalog/:id", getKatalogById);
router.get("/katalog/kategori/:kategori", getKatalogByCategories);
router.post("/katalog", uploadImageKatalog, postKatalog);
router.patch("/katalog/:id", uploadImageKatalog, updateKatalog);
router.delete("/katalog/:id", deleteKatalog);

router.get("/dakwah", getDakwah);
router.get("/dakwah/:id", getDakwahById);
router.get("/dakwah/kategori/:kategori", getDakwahByCategories);
router.post("/dakwah", uploadImageDakwah, postDakwah);
router.patch("/dakwah", uploadImageDakwah, updateDakwah);
router.delete("/dakwah/:id", deleteDakwah);

module.exports = router;
