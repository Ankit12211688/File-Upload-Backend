import File from "../models/File.js";
import { parseFile } from "../utils/parser.js";
import { v4 as uuidv4 } from "uuid";

// In-memory progress map (can use Redis/Job Queue in production)
const progressMap = {};

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const file_id = uuidv4();

        const newFile = await File.create({
            file_id,
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            path: req.file.path,
            size: req.file.size,
            status: "uploading",
            progress: 0,
        });

        // Start async processing
        simulateProcessing(newFile);

        res.status(201).json({ file_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
};

// Simulate async parsing with progress
const simulateProcessing = async (fileDoc) => {
    try {
        let progress = 0;
        progressMap[fileDoc.file_id] = progress;

        // simulate upload then parsing
        const interval = setInterval(async () => {
            progress += 20;
            progressMap[fileDoc.file_id] = progress;

            if (progress >= 100) {
                clearInterval(interval);

                // Parse the file
                const parsed = await parseFile(fileDoc.path, fileDoc.mimetype);

                fileDoc.status = "ready";
                fileDoc.progress = 100;
                fileDoc.parsedContent = parsed;
                await fileDoc.save();

                delete progressMap[fileDoc.file_id];
            } else {
                await File.findOneAndUpdate(
                    { file_id: fileDoc.file_id },
                    { progress, status: "processing" }
                );
            }
        }, 1000);
    } catch (err) {
        await File.findOneAndUpdate(
            { file_id: fileDoc.file_id },
            { status: "failed" }
        );
    }
};

export const getProgress = async (req, res) => {
    const { file_id } = req.params;
    const file = await File.findOne({ file_id });

    if (!file) return res.status(404).json({ message: "File not found" });

    res.json({
        file_id: file.file_id,
        status: file.status,
        progress: file.progress,
    });
};

export const getFileContent = async (req, res) => {
    const { file_id } = req.params;
    const file = await File.findOne({ file_id });

    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.status !== "ready") {
        return res.json({
            message: "File upload or processing in progress. Please try again later.",
        });
    }

    res.json(file.parsedContent);
};

export const listFiles = async (req, res) => {
    const files = await File.find().select("-parsedContent");
    res.json(files);
};

export const deleteFile = async (req, res) => {
    const { file_id } = req.params;
    const file = await File.findOneAndDelete({ file_id });
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted successfully" });
};
