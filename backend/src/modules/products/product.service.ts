import { query } from '../../config/db';

/**
 * @desc Получить все товары с фильтрацией, поиском и пагинацией
 */
export const getAllProductsService = async (filters: any) => {
  const { category_id, min_price, max_price, search, page = 1, limit = 10 } = filters;
  const offset = (Number(page) - 1) * Number(limit);

  let sql = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  // Поиск по названию или описанию (Case-insensitive)
  if (search) {
    params.push(`%${search}%`);
    sql += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  // Фильтр по категории
  if (category_id) {
    params.push(category_id);
    sql += ` AND category_id = $${params.length}`;
  }

  // Фильтр по цене
  if (min_price) {
    params.push(min_price);
    sql += ` AND price >= $${params.length}`;
  }
  if (max_price) {
    params.push(max_price);
    sql += ` AND price <= $${params.length}`;
  }

  // Сортировка и пагинация
  sql += ` ORDER BY created_at DESC LIMIT ${Number(limit)} OFFSET ${offset}`;

  const result = await query(sql, params);

  // Получаем общее количество для фронтенда (чтобы знать сколько всего страниц)
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
 * @desc Создать новый товар
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

/**
 * @desc Обновить данные существующего товара
 */
export const updateProductService = async (id: number, productData: any) => {
  const { category_id, name, description, price, stock_quantity, image_url } = productData;
  
  const result = await query(
    `UPDATE products 
     SET category_id = $1, name = $2, description = $3, price = $4, stock_quantity = $5, image_url = $6 
     WHERE id = $7 RETURNING *`,
    [category_id, name, description, price, stock_quantity, image_url, id]
  );

  if (result.rows.length === 0) {
    throw new Error('Haryt tapylmady!');
  }

  return result.rows[0];
};

/**
 * @desc Полное удаление товара из базы данных
 */
export const deleteProductService = async (id: number) => {
  const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  
  if (result.rows.length === 0) {
    throw new Error('Haryt tapylmady!');
  }

  return result.rows[0];
};
