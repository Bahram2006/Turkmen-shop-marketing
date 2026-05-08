import { query } from '../../config/db';

/**
 * @desc Täze sargyt döretmek üçin Middle-derejeli Service
 * @param userId - Ulanyjy ID
 * @param address - Eltip bermeli salgy
 */
export const createOrderService = async (userId: number, address: string) => {
  try {
    // 1. Tranzaksiýany başlatýarys
    await query('BEGIN');

    // 2. Ulanyjynyň sebedini alýarys (Harydyň bahasy bilen bilelikde)
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

    // 3. Jemi bahany hasaplaýarys
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    // 4. Sargydy 'orders' tablisasyna ýazýarys
    const orderResult = await query(
      `INSERT INTO orders (user_id, total_price, address, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [userId, totalPrice, address, 'pending']
    );

    const orderId = orderResult.rows[0].id;

    // 5. Sebetdäki harytlary 'order_items' tablisasyna göçürýäris (Bulk Insert)
    for (const item of cartItems) {
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // 6. Ulanyjynyň sebedini arassalaýarys
    await query('DELETE FROM cart WHERE user_id = $1', [userId]);

    // 7. Ähli zat üstünlikli bolsa, tranzaksiýany tassyklap (Commit) bazada saklaýarys
    await query('COMMIT');

    return {
      success: true,
      orderId,
      totalPrice,
    };
  } catch (error: any) {
    // 8. Islendik aşakdaky säwlikde ähli zatlary yzyna gaýtarýarys
    await query('ROLLBACK');
    console.error('Order Service Error:', error.message);
    throw new Error(error.message || 'Sargyt döretmekde näsazlyk döredi');
  }
};
