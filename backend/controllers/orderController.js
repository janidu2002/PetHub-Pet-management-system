import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items' });
    }
    const detailed = [];
    for (const i of items) {
      const p = await Product.findById(i.productId);
      if (!p) continue;
      detailed.push({ productId: p._id, name: p.name, price: p.price, qty: i.qty || 1 });
    }
    const order = await Order.create({ userId: req.user._id, items: detailed, total, status: 'Paid' });
    res.status(201).json({ success: true, data: order });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


