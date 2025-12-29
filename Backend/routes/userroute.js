import express from 'express';
import { getprofile, loginuser, logoutuser, registeruser } from '../controllers/usercontroller.js';
import authuser from '../middleware/authuser.js';

const router=express.Router();

router.post('/signupuser',registeruser)
router.post('/loginuser',loginuser)
router.post('/logout',logoutuser)
router.get('/authuser',authuser)
router.get('/profile',getprofile)
export default router;