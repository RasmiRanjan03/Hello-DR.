import express from 'express';
import { Router } from 'express';
import { getdoctors,doctorlogin, authdoc,logoutdoc } from '../controllers/doctorcontroller.js';
import authdoctor from '../middleware/authdoctor.js';

const router=express.Router();

router.get('/get-doctors',getdoctors);
router.post('/doctor-login',doctorlogin);
router.get('/authdoc',authdoc);
router.post('/logout-doc',authdoctor,logoutdoc);
export default router;