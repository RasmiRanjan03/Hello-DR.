import express from 'express';
import { getprofile, loginuser, logoutuser, registeruser,userauth,updateprofile,bookappointment,getuserid } from '../controllers/usercontroller.js';
import authuser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';

const router=express.Router();

router.post('/signupuser',registeruser)
router.post('/loginuser',loginuser)
router.post('/logout',logoutuser)
router.get('/authuser',userauth)
router.get('/profile',authuser,getprofile)
router.get('/getuserid',getuserid)
router.post('/updateprofile', authuser, upload.single('image'), updateprofile)
router.post('/appointment',authuser,bookappointment)
export default router;