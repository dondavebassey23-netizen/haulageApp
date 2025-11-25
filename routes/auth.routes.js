import express from 'express';
import { Signup, Signin } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/login', Signin);
router.post('/register', Signup);



export default router;