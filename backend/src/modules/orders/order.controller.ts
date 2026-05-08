import { Request, Response, NextFunction } from 'express';
import * as OrderService from './order.service';

/**
 * @desc Täze sargyt döretmek (Müşderi)
 */
export const createOrder = async (req: any, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const { address } = req.body;

  // Validation
  if (!address || address.trim().length < 5) {
    return res.status(400).json({ 
      success: false, 
      message: 'Sargyt üçin dogry we doly salgy giriziň!' 
    });
  }

  try {
    const result = await OrderService.createOrderService(userId, address);
    res.status(201).json({
      success: true,
      message: 'Sargydyňyz kabul edildi! 🚀',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Ähli sargytlary görmek (Admin)
 */
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.getAllOrdersService();
    res.status(200).json({
      success: true,
      orders
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Sargydyň statusyny täzelemek (Admin)
 */
export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await OrderService.updateOrderStatusService(Number(id), status);
    res.status(200).json({
      success: true,
      message: 'Sargyt statusy täzelendi! ✅',
      order
    });
  } catch (err) {
    next(err);
  }
};
