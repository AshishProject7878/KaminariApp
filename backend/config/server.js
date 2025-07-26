import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/Lib/db.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create the Express app
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Start the Server ---
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});