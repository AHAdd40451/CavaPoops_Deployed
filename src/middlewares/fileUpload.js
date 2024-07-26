import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 10 * 1024 * 1024, // limit file size to 10MB (adjust if needed)
  // },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = /image\/(jpeg|jpg|png|gif)|video\/(mp4|mkv|webm|avi)/;
    if (!file.mimetype.match(allowedMimeTypes)) {
      cb(new Error("File is not an image or video"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
