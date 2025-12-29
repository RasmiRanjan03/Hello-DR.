import express from 'express';
import { Router } from 'express';
import { getdoctors } from '../controllers/doctorcontroller.js';

const router=express.Router();

router.get('/get-doctors',getdoctors);
export default router;