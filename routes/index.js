import express from "express";
import { deleteBerita, getBerita, postBerita, updateBerita } from "../controller/berita.js";
import uploadImage from "../middleware/multer.js";

const router = express.Router();

router.get('/berita', getBerita);
router.post('/berita', uploadImage, postBerita);
router.patch('/berita', uploadImage, updateBerita);
router.delete('/berita/:id', deleteBerita);

export default router;