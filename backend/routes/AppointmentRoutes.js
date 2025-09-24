import express from 'express';
import { 
    createAppointment, 
    getUserAppointments, 
    getAllAppointments, 
    updateAppointmentStatus 
} from '../controllers/AppointmentController.js';
import { protect } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/my-appointments', protect, getUserAppointments);
router.get('/all', protect, getAllAppointments); // Admin only
router.put('/:id/status', protect, updateAppointmentStatus);

export default router;