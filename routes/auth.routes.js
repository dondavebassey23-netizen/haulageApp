import express from 'express';
import { Signup, Signin } from '../controllers/user.controllers.js';


const router = express.Router();

router.post('/login', Signin);
router.post('/register', Signup);



export default router;