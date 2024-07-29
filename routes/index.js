import express from "express";
import { postBerita } from "../controller/berita.js";
import uploadImage from "../middleware/multer.js";

const router = express.Router();

router.post('/berita', uploadImage, postBerita);

export default router;