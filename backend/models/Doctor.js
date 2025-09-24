import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: 'Veterinarian' },
  specialization: { type: String, default: 'General' },
  experienceYears: { type: Number, default: 0 },
  photoUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);


