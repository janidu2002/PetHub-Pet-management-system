import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './models/Doctor.js';

dotenv.config();

const doctors = [
  {
    name: 'Dr. Samantha Perera',
    title: 'Chief Veterinarian',
    specialization: 'Small Animal Medicine',
    experienceYears: 15,
    photoUrl: ''
  },
  {
    name: 'Dr. Rukshan Silva',
    title: 'Senior Veterinarian',
    specialization: 'Emergency Care',
    experienceYears: 12,
    photoUrl: ''
  },
  {
    name: 'Dr. Niluka Fernando',
    title: 'Veterinary Surgeon',
    specialization: 'Surgical Procedures',
    experienceYears: 8,
    photoUrl: ''
  }
];

async function run() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Doctor.countDocuments();
    if (existing === 0) {
      await Doctor.insertMany(doctors);
      console.log('Seeded doctors');
    } else {
      console.log(`Doctors already present (${existing}), skipping insert`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();


