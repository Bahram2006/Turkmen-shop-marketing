import { Router } from 'express';
import { addToCart } from './cart.controller';
import { verifyToken } from '../../middleware/authMiddleware';

const router = Router();

// POST /api/cart -> Haryt goşmak (verifyToken hökman!)
router.post('/', verifyToken, addToCart);

export default router;
