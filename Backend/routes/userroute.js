import express from 'express';
import { registeruser } from '../controllers/usercontroller.js';

const router=express.Router();

router.post('/signupuser',registeruser)

export default router;