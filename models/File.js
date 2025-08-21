import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
    {
        file_id: { type: String, unique: true, required: true },
        filename: String,
        mimetype: String,
        path: String, // file storage path
        size: Number,
        status: {
            type: String,
            enum: ["uploading", "processing", "ready", "failed"],
            default: "uploading",
        },
        progress: { type: Number, default: 0 },
        parsedContent: { type: Object }, // store parsed JSON
    },
    { timestamps: true }
);

export default mongoose.model("File", FileSchema);
