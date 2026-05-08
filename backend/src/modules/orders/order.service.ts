import { query } from '../../config/db';

/**
 * @desc Täze sargyt döretmek (Müşderi üçin)
 */
export const createOrderService = async (userId: number, address: string) => {
  try {
    await query('BEGIN');

    const cartResult = await query(
      `SELECT cart.product_id, cart.quantity, products.price 
       FROM cart 
       JOIN products ON cart.product_id = products.id 
       WHERE cart.user_id = $1`,
      [userId]
    );

    const cartItems = cartResult.rows;

    if (cartItems.length === 0) {
      await query('ROLLBACK');
      throw new Error('Sebet boş, sargyt döredip bolmaýar!');
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    const orderResult = await query(
      `INSERT INTO orders (user_id, total_price, address, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [userId, totalPrice, address, 'pending']
    );

    const orderId = orderResult.rows[0].id;

    for (const item of cartItems) {
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await query('DELETE FROM cart WHERE user_id = $1', [userId]);

    await query('COMMIT');

    return { success: true, orderId, totalPrice };
  } catch (error: any) {
    await query('ROLLBACK');
    throw new Error(error.message || 'Sargyt döretmekde näsazlyk döredi');
  }
};

/**
 * @desc Ähli sargytlary görmek (Admin üçin)
 * JOIN arkaly ulanyjynyň adyny hem alýarys
 */
export const getAllOrdersService = async () => {
  const result = await query(
    `SELECT orders.*, users.full_name 
     FROM orders 
     JOIN users ON orders.user_id = users.id 
     ORDER BY orders.created_at DESC`
  );
  return result.rows;
};

/**
 * @desc Sargydyň statusyny täzelemek (Admin üçin)
 * Meselem: pending -> shipping -> delivered
 */
export const updateOrderStatusService = async (orderId: number, status: string) => {
  const result = await query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, orderId]
  );

  if (result.rows.length === 0) {
    throw new Error('Sargyt tapylmady!');
  }

  return result.rows[0];
};
