import { Router } from 'express';
import * as ProductController from './product.controller';
import { verifyToken, isAdmin } from '../../middleware/authMiddleware';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Ähli harytlary süzgüçler we sahypalama bilen görmek (Hemme kişi üçin açyk)
 * @access  Public
 */
router.get('/', ProductController.getProducts);

/**
 * @route   POST /api/products
 * @desc    Täze haryt goşmak
 * @access  Private (Diňe Admin)
 */
router.post('/', verifyToken, isAdmin, ProductController.createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Bar bolan harydyň maglumatlaryny täzelemek
 * @access  Private (Diňe Admin)
 */
router.put('/:id', verifyToken, isAdmin, ProductController.updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Harydy bazadan doly öçürmek
 * @access  Private (Diňe Admin)
 */
router.delete('/:id', verifyToken, isAdmin, ProductController.deleteProduct);

export default router;
