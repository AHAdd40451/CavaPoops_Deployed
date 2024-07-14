import express from "express";
import upload from "../middlewares/fileUpload.js";
import { uploadImages } from "../controllers/general.controllers.js";

const generalRoutes = express.Router();

// Create a Category
generalRoutes.post("/upload", upload.array("files", 10), uploadImages);

export default generalRoutes;
