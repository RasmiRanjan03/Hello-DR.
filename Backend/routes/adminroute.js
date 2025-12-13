import express from 'express';
import { addDoctor } from '../controllers/admincontroller.js';
import upload from '../middleware/multer.js';

const router=express.Router();

router.post('/add-doctor',upload.single('image'),addDoctor);

export default router;
