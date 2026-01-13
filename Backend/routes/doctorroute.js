import express from 'express';
import { Router } from 'express';
import { getdoctors,doctorlogin, authdoc,logoutdoc,getappointment,cancelappointment,completeappointment,getdashboarddata,
    updateprofile,getprofile } from '../controllers/doctorcontroller.js';
import authdoctor from '../middleware/authdoctor.js';

const router=express.Router();

router.get('/get-doctors',getdoctors);
router.post('/doctor-login',doctorlogin);
router.get('/authdoc',authdoc);
router.post('/logout-doc',authdoctor,logoutdoc);
router.get('/getappointments',authdoctor,getappointment)
router.post('/cancelappointment',authdoctor,cancelappointment)
router.post('/completeappointment',authdoctor,completeappointment)
router.get('/getdashboarddata',authdoctor,getdashboarddata)
router.get('/getprofile',authdoctor,getprofile)
router.post('/updateprofile',authdoctor,updateprofile)
export default router;