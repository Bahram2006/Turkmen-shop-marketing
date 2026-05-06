import { Response } from 'express';
import { query } from '../../config/db';

/**
 * @desc    Harydy sebete goşmak
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = async (req: any, res: Response) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    // 1. Harydy sebete goşmak
    const newItem = await query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity || 1]
    );

    res.status(201).json({
      message: 'Haryt sebete goşuldy!',
      cartItem: newItem.rows[0]
    });
  } catch (err) {
    console.error('Add to Cart Error:', err);
    res.status(500).json({ message: 'Sebete goşanda säwlik boldy!' });
  }
};

/**
 * @desc    Ulanyjynyň sebedini görmek
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req: any, res: Response) => {
  const user_id = req.user.id;

  try {
    // Harytlaryň ady, bahasy we suraty bilen bilelikde getirmek (JOIN ulanýarys)
    const cartItems = await query(
      `SELECT 
        cart.id as cart_id, 
        products.name, 
        products.price, 
        cart.quantity, 
        (products.price * cart.quantity) as total_item_price,
        products.image_url 
       FROM cart 
       JOIN products ON cart.product_id = products.id 
       WHERE cart.user_id = $1`,
      [user_id]
    );

    res.status(200).json({
      count: cartItems.rows.length,
      items: cartItems.rows
    });
  } catch (err) {
    console.error('Get Cart Error:', err);
    res.status(500).json({ message: 'Sebeti alyp bolmady!' });
  }
};

/**
 * @desc    Sebetden harydy aýyrmak
 * @route   DELETE /api/cart/:id
 * @access  Private
 */
export const removeFromCart = async (req: any, res: Response) => {
  const { id } = req.params; // Sebetdäki item-iň ID-sy
  const user_id = req.user.id;

  try {
    const result = await query(
      'DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Haryt tapylmady!' });
    }

    res.status(200).json({ message: 'Haryt sebetden aýryldy!' });
  } catch (err) {
    console.error('Remove from Cart Error:', err);
    res.status(500).json({ message: 'Harydy aýryp bolmady!' });
  }
};
