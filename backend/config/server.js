import express from 'express';  
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Lib/db.js';
import userRoutes from './Routes/userRoute.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT;
 
// Middleware setup
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});