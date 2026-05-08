import { query } from '../../config/db';

/**
 * @desc Harytlary süzgüç we sahypalama bilen almak
 */
export const getAllProductsService = async (filters: any) => {
  const { category_id, min_price, max_price, search, page = 1, limit = 10 } = filters;
  const offset = (Number(page) - 1) * Number(limit);

  let sql = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  // Gözleg (Search) - ILIKE uly-kiçi harpa seretmeýär
  if (search) {
    params.push(`%${search}%`);
    sql += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  // Kategoriýa süzgüçi
  if (category_id) {
    params.push(category_id);
    sql += ` AND category_id = $${params.length}`;
  }

  // Baha aralygy
  if (min_price) {
    params.push(min_price);
    sql += ` AND price >= $${params.length}`;
  }
  if (max_price) {
    params.push(max_price);
    sql += ` AND price <= $${params.length}`;
  }

  // Sahypalama we tertipleme
  sql += ` ORDER BY created_at DESC LIMIT ${Number(limit)} OFFSET ${offset}`;

  const result = await query(sql, params);
  
  // Jemi haryt sanyny alýarys (Sahypalama üçin gerek)
  const countResult = await query('SELECT COUNT(*) FROM products');
  const totalProducts = parseInt(countResult.rows[0].count);

  return {
    products: result.rows,
    pagination: {
      total: totalProducts,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalProducts / Number(limit))
    }
  };
};

/**
 * @desc Täze haryt goşmak
 */
export const createProductService = async (productData: any) => {
  const { category_id, name, description, price, stock_quantity, image_url } = productData;
  
  const result = await query(
    `INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [category_id, name, description, price, stock_quantity, image_url]
  );

  return result.rows[0];
};
