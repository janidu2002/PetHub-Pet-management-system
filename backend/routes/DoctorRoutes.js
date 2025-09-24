import express from 'express';
import { listDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/DoctorController.js';
import { protect, adminOnly } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', listDoctors);

router.post('/', protect, adminOnly, createDoctor);
router.put('/:id', protect, adminOnly, updateDoctor);
router.delete('/:id', protect, adminOnly, deleteDoctor);

export default router;


