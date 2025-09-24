import express from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';
import { protect, adminOnly } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);

router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;


