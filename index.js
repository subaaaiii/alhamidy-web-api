const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index.js');
const db = require('./config/database.js');
const { Berita, Katalog, Dakwah } = require('./models/models.js');

dotenv.config();

const app = express();
const port = process.env.PORT;

// try {
//   await db.authenticate();
//   console.log("Database Connected...");
//   await Berita.sync();
//   await Katalog.sync();
//   await Dakwah.sync();
// } catch (error) {
//   console.error(error);
// }

app.get("/", (req, res) => {
  try {
    res.status(200).send({
      message: "this is my api",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
// CORS configuration
const corsOptions = {
  origin: '*', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); // Add CORS middleware before other middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use("/images/berita", express.static('./images/berita'));
app.use("/images/katalog", express.static('./images/katalog'));
app.use("/images/dakwah", express.static('./images/dakwah'));
app.use(express.urlencoded({ extended: false }));
app.use(router); // Add your routes after other middlewares

app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`)
);
