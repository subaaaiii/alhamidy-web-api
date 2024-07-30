import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";
import db from "./config/database.js";
import { Berita, Katalog, Dakwah } from "./models/models.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

try {
    await db.authenticate();
    console.log("Database Connected...");
    await Berita.sync();
    await Katalog.sync();
    await Dakwah.sync();
  } catch (error) {
    console.error(error);
  }
  app.use(router);
  app.use(cors());
  app.use(bodyParser.json())
  app.use(cookieParser());
  app.use(express.json());
  app.use("/images/berita", express.static('./images/berita'))
  app.use("/images/katalog", express.static('./images/katalog'))
  app.use("/images/dakwah", express.static('./images/dakwah'))
  app.use(express.urlencoded({extended: false}));
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
