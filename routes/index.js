import express from "express";
import {
  deleteBerita,
  getBerita,
  getBeritaByCategories,
  postBerita,
  updateBerita,
} from "../controller/berita.js";
import {
  deleteKatalog,
  getKatalog,
  getKatalogByCategories,
  postKatalog,
  updateKatalog,
} from "../controller/katalog.js";
import { uploadImageKatalog, uploadImageBerita } from "../middleware/multer.js";
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

export default router;