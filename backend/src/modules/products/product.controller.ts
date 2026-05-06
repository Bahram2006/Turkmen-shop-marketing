import { Request, Response } from 'express';
import { query } from '../../config/db';

/**
 * @desc    Täze haryt goşmak (Admin üçin)
 * @route   POST /api/products
 */
export const createProduct = async (req: Request, res: Response) => {
  const { category_id, name, description, price, stock_quantity, image_url } = req.body;

  try {
    // MAGLUMATLARNY SAN GÖRNÜŞINE ÖWÜRMEK (Örän möhüm!)
    const parsedCategoryId = Number(category_id);
    const parsedPrice = Number(price);
    const parsedStock = Number(stock_quantity) || 0;

    const newProduct = await query(
      `INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [parsedCategoryId, name, description, parsedPrice, parsedStock, image_url]
    );

    res.status(201).json({
      message: 'Haryt üstünlikli goşuldy!',
      product: newProduct.rows[0]
    });
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ message: 'Haryt goşulanda säwlik boldy!' });
  }
};

/**
 * @desc    Ähli harytlary görmek
 * @route   GET /api/products
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await query('SELECT * FROM products ORDER BY created_at DESC');
    res.status(200).json(products.rows);
  } catch (err) {
    console.error('Get Products Error:', err);
    res.status(500).json({ message: 'Harytlary alyp bolmady!' });
  }
};
