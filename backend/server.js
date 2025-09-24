import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import petRoutes from './routes/petsRouters.js'
import appointmentRoutes from './routes/AppointmentRoutes.js'
import doctorRoutes from './routes/DoctorRoutes.js'
import productRoutes from './routes/ProductRoutes.js'
import orderRoutes from './routes/oderRouters.js'
import paymentRoutes from './routes/paymentRoutes'
import Product from './models/Product.js'
import Doctor from './models/Doctor.js'
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Seed doctors if collection is empty (idempotent)
    (async () => {
      try {
        const count = await Doctor.countDocuments();
        if (count === 0) {
          await Doctor.insertMany([
            { name: 'Dr. Samantha Perera', title: 'Chief Veterinarian', specialization: 'Small Animal Medicine', experienceYears: 15, isActive: true },
            { name: 'Dr. Rukshan Silva', title: 'Senior Veterinarian', specialization: 'Emergency Care', experienceYears: 12, isActive: true },
            { name: 'Dr. Niluka Fernando', title: 'Veterinary Surgeon', specialization: 'Surgical Procedures', experienceYears: 8, isActive: true }
          ]);
          console.log('Seeded default doctors');
        }
      } catch (e) {
        console.error('Doctor seeding failed:', e.message);
      }
    })();

    // Seed products if empty (idempotent)
    ;(async () => {
      try {
        const pcount = await Product.countDocuments();
        if (pcount === 0) {
          await Product.insertMany([
            { name: 'Premium Dog Food 5kg', category: 'Food', price: 29.99, description: 'Balanced nutrition for adult dogs', inStock: true, stockQty: 50, imageUrl: 'https://images.unsplash.com/photo-1589927986089-35812388d1d1?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Kitten Dry Food 2kg', category: 'Food', price: 18.5, description: 'High-protein formula for growing kittens', inStock: true, stockQty: 40, imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Interactive Ball Toy', category: 'Toy', price: 9.99, description: 'Durable rubber ball for active play', inStock: true, stockQty: 120, imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Feather Teaser Wand', category: 'Toy', price: 7.49, description: 'Engaging teaser toy for cats', inStock: true, stockQty: 100, imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Flea & Tick Medicine', category: 'Medicine', price: 24.0, description: 'Topical protection for 30 days', inStock: true, stockQty: 35, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Digestive Probiotics', category: 'Medicine', price: 15.0, description: 'Supports healthy gut flora', inStock: true, stockQty: 60, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Oatmeal Shampoo 500ml', category: 'Accessory', price: 12.99, description: 'Gentle grooming shampoo for sensitive skin', inStock: true, stockQty: 80, imageUrl: 'https://images.unsplash.com/photo-1615485737651-3a5a7cba1cc3?q=80&w=1200&auto=format&fit=crop' },
            { name: 'Anti-Shed Brush', category: 'Accessory', price: 11.5, description: 'Reduces shedding and detangles coat', inStock: true, stockQty: 70, imageUrl: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?q=80&w=1200&auto=format&fit=crop' }
          ]);
          console.log('Seeded default products');
        }
      } catch (e) {
        console.error('Product seeding failed:', e.message);
      }
    })();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });