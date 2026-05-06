import { Response } from 'express';
import { query } from '../../config/db';

/**
 * @desc    Täze sargyt döretmek
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req: any, res: Response) => {
  const user_id = req.user.id;
  const { address } = req.body;

  try {
    // 1. Sebetdäki harytlary alýarys
    const cartItems = await query(
      'SELECT cart.*, products.price FROM cart JOIN products ON cart.product_id = products.id WHERE user_id = $1',
      [user_id]
    );

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ message: 'Sebet boş, sargyt edip bolmaýar!' });
    }

    // 2. Jemi bahany hasaplamak
    const totalPrice = cartItems.rows.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);

    // 3. Sargyt döretmek
    const newOrder = await query(
      'INSERT INTO orders (user_id, total_price, address) VALUES ($1, $2, $3) RETURNING id',
      [user_id, totalPrice, address]
    );
    const order_id = newOrder.rows[0].id;

    // 4. Harytlary order_items-a göçürmek
    for (const item of cartItems.rows) {
      await query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    // 5. Sebedi arassalamak
    await query('DELETE FROM cart WHERE user_id = $1', [user_id]);

    res.status(201).json({
      message: 'Sargyt üstünlikli kabul edildi!',
      order_id,
      total_price: totalPrice
    });

  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ message: 'Sargyt döretmekde säwlik boldy!' });
  }
};
