import Appointment from '../models/Appointment.js';

// Create new appointment
export const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment({
            ...req.body,
            petOwner: req.user?._id
        });
        
        await appointment.save();
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all appointments for a user
export const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ petOwner: req.user?._id });
        res.json ({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all appointments (Admin)
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('petOwner', 'name email');
        res.json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};