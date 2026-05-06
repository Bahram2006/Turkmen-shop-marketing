import { Router } from 'express';
import { createProduct, getProducts } from './product.controller';
import { verifyToken, isAdmin } from '../../middleware/authMiddleware';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Ähli harytlary görmek (Hemme ulanyjylar üçin açyk)
 * @access  Public
 */
router.get('/', getProducts);

/**
 * @route   POST /api/products
 * @desc    Täze haryt goşmak
 * @access  Private (Diňe Admin)
 */
router.post('/', verifyToken, isAdmin, createProduct);

export default router;
