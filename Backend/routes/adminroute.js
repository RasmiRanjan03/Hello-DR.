import express from 'express';
import { addDoctor,loginAdmin,logoutAdmin,alldoctors,allapointments, cancelappointment, dashboarddata } from '../controllers/admincontroller.js';
import { changeavailability } from '../controllers/doctorcontroller.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authadmin.js';

const router=express.Router();

router.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
router.post('/login-admin',upload.none(),loginAdmin);
router.post('/logout-admin',authAdmin,logoutAdmin);
router.post('/all-doctors',authAdmin,alldoctors);
router.post('/change-availability',authAdmin,changeavailability)
router.get('/all-appointments',authAdmin,allapointments);
router.post('/cancel-appointment',authAdmin,cancelappointment);
router.get('/dashboarddata',authAdmin,dashboarddata)
router.get('/check-auth', authAdmin, (req, res) => {
	return res.status(200).json({ success: true, message: 'Authenticated' });
});

export default router;
