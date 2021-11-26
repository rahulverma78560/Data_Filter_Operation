import path from "path";
import express from "express";
import multer from "multer";
const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file: any, cb: any) {
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("CSV only!");
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

uploadRouter.post("/uploadFile", upload.single("data"));

export default uploadRouter;
