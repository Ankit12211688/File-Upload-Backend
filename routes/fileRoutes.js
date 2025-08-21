import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
    uploadFile,
    getProgress,
    getFileContent,
    listFiles,
    deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

// Ensure upload dir exists from .env
const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/files", upload.single("file"), uploadFile);
router.get("/files/:file_id/progress", getProgress);
router.get("/files/:file_id", getFileContent);
router.get("/files", listFiles);
router.delete("/files/:file_id", deleteFile);

export default router;
