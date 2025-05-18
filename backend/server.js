//IMage Database

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
mongoose
  .connect("mongodb://127.0.0.1:27017/images")
  .then(() => console.log("Connection established with database!"));

//model
const ImageSchema = new mongoose.Schema(
  {
    image: String,
  },
  {
    collection: "uploads",
  }
);
const imageModel = mongoose.model("uploads", ImageSchema);

app.get("/image-upload", async (req, res) => {
  res.send("success!");
});

///////////////////////////////
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() ;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/data", upload.single("image"), async (req, res) => {
  console.log(req.file, req.body);
  const imageName = req.file.filename;
  try {
    await imageModel.create({ image: imageName })
      res.json({status:"ok",image:imageName})
  } catch (err) {
    res.json(500).json({error:"error uploading image"})
  }
});

app.get("/get-image", async (req, res) => {
  try {
   const images = await imageModel.find({});
   res.json({ status: "ok", data: images });
  } catch (err) {
    res.json(500).json({error:"server error"})
  }
});

app.listen(3000, () => {
  console.log("server is running...");
});
