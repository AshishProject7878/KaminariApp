import express from 'express';  
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Lib/db.js';
import userRoutes from './Routes/userRoute.js';
import subRoutes from './Routes/SubRoute.js';

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
app.use('/api/subs', subRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});