// import express from 'express';
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
// import postRoutes from './routes/posts.js';
// import cookieParser from 'cookie-parser';
// import multer from 'multer';

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../frontend/public/upload')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()+file.originalname)
//     }
//   })



// const upload = multer({ storage })
// app.post('/api/upload', upload.single('file'), function (req, res) {
//     const file = req.file;
//     res.status(200).json(file.filename);
//   })

// app.use('/api/auth',authRoutes);
// app.use('/api/users',userRoutes);
// app.use('/api/posts',postRoutes);

// app.listen(8800,()=>{
//     console.log("Connected");
// })
import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.status(200).json( file.filename );
  // console.log({filename: file.filename} )
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Start the server
app.listen(8800, () => {
  console.log("Connected!");
});
