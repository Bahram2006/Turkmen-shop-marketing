import { Router } from 'express';
import { addToCart, getCart, removeFromCart } from './cart.controller';
import { verifyToken } from '../../middleware/authMiddleware';

const router = Router();

// Ähli ýollar verifyToken arkaly goralan (Diňe login bolanlar üçin)
router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.delete('/:id', verifyToken, removeFromCart);

export default router;
