import { Request, Response } from 'express';
import { query } from '../../config/db';

/**
 * @desc    Täze haryt goşmak (Admin üçin)
 * @route   POST /api/products
 */
export const createProduct = async (req: Request, res: Response) => {
  const { category_id, name, description, price, stock_quantity, image_url } = req.body;

  try {
    const newProduct = await query(
      `INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [category_id, name, description, price, stock_quantity, image_url]
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
    res.status(500).json({ message: 'Harytlary alyp bolmady!' });
  }
};
