import express from 'express';  
import dotenv from 'dotenv';
import { PORT } from './config/env.js';
import { ConnectDb } from './database/mongodb.js';
import authRoutes from './routes/auth.routes.js';


dotenv.config(); 
const app=express();
app.use(express.json());
app.use('/auth', authRoutes);


app.listen(PORT, async ()=>{
    console.log(`Server is running`);
    await ConnectDb();
});