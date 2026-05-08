import { Router } from 'express';
import * as OrderController from './order.controller';
import { verifyToken, isAdmin } from '../../middleware/authMiddleware';

const router = Router();

/**
 * @route   POST /api/orders
 * @desc    Täze sargyt döretmek
 * @access  Private (Ulanyjy)
 */
router.post('/', verifyToken, OrderController.createOrder);

/**
 * @route   GET /api/orders
 * @desc    Ähli sargytlary görmek
 * @access  Private (Diňe Admin)
 */
router.get('/', verifyToken, isAdmin, OrderController.getAllOrders);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Sargydyň statusyny täzelemek (pending, shipping, delivered)
 * @access  Private (Diňe Admin)
 */
router.patch('/:id/status', verifyToken, isAdmin, OrderController.updateStatus);

export default router;
