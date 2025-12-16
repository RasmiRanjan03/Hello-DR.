import express from 'express';
import { addDoctor,loginAdmin } from '../controllers/admincontroller.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authadmin.js';

const router=express.Router();

router.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
router.post('/login-admin',upload.none(),loginAdmin);
router.post('/protected-route',authAdmin)

export default router;
