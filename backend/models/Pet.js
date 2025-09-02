import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  lastVaccinationDate: {
    type: Date
  },
  weight: {
    type: String
  },
  ownerName: {
    type: String
  }
}, {
  timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;

