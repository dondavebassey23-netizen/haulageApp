import express from 'express';  
import dotenv from 'dotenv';
import { PORT } from './config/env.js';
import { ConnectDb } from './database/mongodb.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config(); 
const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5000", "https://prestige-haul.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/auth', authRoutes);


app.listen(PORT, async ()=>{
    console.log(`Server is running`);
    await ConnectDb();
});