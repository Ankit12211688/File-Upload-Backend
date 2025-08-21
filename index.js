import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();
const PORT = process.env.PORT
console.log(PORT)

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", fileRoutes);

// Start server
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
