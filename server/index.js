import express from "express";
import cors from "cors";
import multer from "multer";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      "http://localhost:5173",
      "https://pick-and-drop-2723.netlify.app"
    ];
    if (!origin) return callback(null, true);
    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/*
  url = http://localhost:5000/upload/image1.jpg
  /upload/image1.jpg
*/
app.use('/uploads', express.static(uploadsDir));
const imageCache = new Map();

const friendsMap = new Map([
  ['id1', 'id2'],
  ['id2', 'id1']
]);


//-------------MULTER CONFIGS--------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `image-${name}-${timestamp}-${uniqueString}${ext}`);
  }
});

const upload = multer({ storage });


app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const userId = req.body.userId;
    const imagePath = `/uploads/${req.file.filename}`;

    imageCache.set(userId, imagePath);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      imagePath
    })

  } catch (error) {
    console.error("Upload error: ", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    })
  }
});


app.get('/drop/:receiverId', (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const senderId = friendsMap.get(receiverId);

    if (!senderId) {
      return res.json({
        success: false,
        message: "No friend mapping found",
      });
    }

    const imagePath = imageCache.get(senderId);

    if (!imagePath) {
      return res.json({
        success: false,
        message: "No image available from your friend",
      })
    }

    imageCache.delete(senderId);

    res.json({
      success: true,
      imagePath,
      message: "Image received"
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Drop failed",
    })
  }
})


app.get('/health', (req, res) => {
  res.json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});