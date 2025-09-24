import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    petOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    petType: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        enum: ['Vaccination', 'Grooming', 'Checkup', 'Surgery', 'Dental'],
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    veterinarian: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    notes: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);