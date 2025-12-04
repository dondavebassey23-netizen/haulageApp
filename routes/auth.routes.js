import express from 'express';
import { Signup, Signin } from '../controllers/user.controllers.js';


const authrouter = express.Router();

authrouter.post('/signin', Signin);
authrouter.post('/signup', Signup);



export default authrouter;