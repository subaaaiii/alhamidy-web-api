import express from "express";
import {
   getBerita,
  deleteBerita,
  getBeritaByCategories,
  postBerita,
  updateBerita,
} from "../controller/berita.js";
import {
  deleteKatalog,
  getKatalogByCategories,
  getKatalog,
  postKatalog,
  updateKatalog,
} from "../controller/katalog.js";
import {
  getDakwah,
  getDakwahByCategories,
  postDakwah,
  updateDakwah,
  deleteDakwah,
} from "../controller/dakwah.js";
import { uploadImageKatalog, uploadImageBerita, uploadImageDakwah } from "../middleware/multer.js";
const router = express.Router();

router.get("/berita", getBerita);
router.get("/berita/:kategori", getBeritaByCategories);
router.post("/berita", uploadImageBerita, postBerita);
router.patch("/berita", uploadImageKatalog, updateBerita);
router.delete("/berita/:id", deleteBerita);

router.get("/katalog", getKatalog);
router.get("/katalog/:kategori", getKatalogByCategories);
router.post("/katalog", uploadImageKatalog, postKatalog);
router.patch("/katalog", uploadImageKatalog, updateKatalog);
router.delete("/katalog/:id", deleteKatalog);

router.get("/dakwah", getDakwah);
router.get("/dakwah/:kategori", getDakwahByCategories);
router.post("/dakwah", uploadImageDakwah, postDakwah);
router.patch("/dakwah", uploadImageDakwah, updateDakwah);
router.delete("/dakwah/:id", deleteDakwah);

export default router;