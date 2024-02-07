const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors')
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const router = express.Router();
const path = require("path");



const app = express();


dotenv.config();
app.use(cors())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.use("/images", express.static(path.join(__dirname, "public/images")));

    //middleware
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/images");
      },
      filename: (req, file, cb) => {
        cb(null, file.name);
      },
    });

    const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
      try {
        return res.status(200).json("File uploded successfully");
     
      } catch (error) {
        console.error(error);
      }
    });

    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/posts", postRoute);

    const port = process.env.PORT || 8800;

    app.listen(port, () => {
      console.log("Backend server is running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
