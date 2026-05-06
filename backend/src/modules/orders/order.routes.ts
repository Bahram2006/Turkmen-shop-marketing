import { Router } from 'express';
import { createOrder } from './order.controller';
import { verifyToken } from '../../middleware/authMiddleware';

const router = Router();

// POST /api/orders -> Sargyt döretmek (Diňe login bolanlar üçin)
router.post('/', verifyToken, createOrder);

export default router;
