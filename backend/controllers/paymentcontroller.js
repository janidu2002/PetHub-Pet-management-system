import User from '../models/User.js';

// WARNING: Demo-only storage of masked card metadata. Do NOT store raw PANs/CVV.
export const saveCard = async (req, res) => {
  try {
    const { brand, last4, expMonth, expYear, label } = req.body;
    if (!brand || !last4 || !expMonth || !expYear) {
      return res.status(400).json({ success: false, message: 'Missing card fields' });
    }
    const user = await User.findById(req.user._id);
    user.savedPaymentMethods.push({ brand, last4, expMonth, expYear, label });
    await user.save();
    res.status(201).json({ success: true, methods: user.savedPaymentMethods });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const listCards = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, methods: user.savedPaymentMethods || [] });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    const user = await User.findById(req.user._id);
    const card = user.savedPaymentMethods.id(id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    if (typeof label === 'string') card.label = label;
    await user.save();
    res.json({ success: true, methods: user.savedPaymentMethods });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const card = user.savedPaymentMethods.id(id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    card.deleteOne();
    await user.save();
    res.json({ success: true, methods: user.savedPaymentMethods });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


