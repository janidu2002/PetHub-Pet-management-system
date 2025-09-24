import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Food', 'Toy', 'Accessory', 'Medicine'], required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  imageUrl: { type: String },
  inStock: { type: Boolean, default: true },
  stockQty: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);


