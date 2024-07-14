import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/image\/(jpeg|jpg|png|gif)/)) {
      cb(new Error("File is not an image"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
