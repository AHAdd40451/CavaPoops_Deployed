import { bucket } from "../../server.js";

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadPromises = req.files.map(async (file) => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on("error", (err) => {
          reject(err);
        });

        blobStream.on("finish", async () => {
          await blob.makePublic();
          resolve();
        });

        blobStream.end(file.buffer);
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      return { fileName: file.originalname, fileUrl: publicUrl };
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    res.status(200).json({ files: uploadedFiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
