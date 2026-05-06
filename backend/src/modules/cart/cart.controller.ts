import { Response } from 'express';
import { query } from '../../config/db';

export const addToCart = async (req: any, res: Response) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id; // verifyToken-dan gelýän maglumat

  try {
    const newItem = await query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity || 1]
    );

    res.status(201).json({
      message: 'Haryt sebete goşuldy!',
      cartItem: newItem.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sebete goşanda säwlik boldy!' });
  }
};
