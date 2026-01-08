import express from 'express';
import { getprofile, loginuser, logoutuser, registeruser,userauth,updateprofile,bookappointment,getappointment,cancelappointment } from '../controllers/usercontroller.js';
import authuser from '../middleware/authuser.js';
import upload from '../middleware/multer.js';

const router=express.Router();

router.post('/signupuser',registeruser)
router.post('/loginuser',loginuser)
router.post('/logout',logoutuser)
router.get('/authuser',userauth)
router.get('/profile',authuser,getprofile)
router.post('/updateprofile', authuser, upload.single('image'), updateprofile)
router.post('/appointment',authuser,bookappointment)
router.post('/getappointments',authuser,getappointment)
router.post('/cancelappointment',authuser,cancelappointment)
export default router;