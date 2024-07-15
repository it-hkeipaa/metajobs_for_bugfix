import type { NextApiRequest, NextApiResponse } from "next";
const multer = require("multer");
const path = require("path");

// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: NextApiRequest, file: any, cb: any) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp" &&
      ext !== ".svg" &&
      ext !== ".pdf" &&
      ext !== ".doc" &&
      ext !== ".docx"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
