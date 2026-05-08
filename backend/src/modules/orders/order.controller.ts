import { Response } from 'express';
import { createOrderService } from './order.service';

export const createOrder = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { address } = req.body;

  // Validation (Middle-level requirement)
  if (!address || address.trim().length < 5) {
    return res.status(400).json({ 
      success: false, 
      message: 'Sargyt üçin dogry we doly salgy giriziň!' 
    });
  }

  try {
    const result = await createOrderService(userId, address);
    
    res.status(201).json({
      success: true,
      message: 'Sargydyňyz kabul edildi! 🚀',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};
