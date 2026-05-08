import { Request, Response, NextFunction } from 'express';
import * as ProductService from './product.service';

/**
 * @desc Ähli harytlary süzgüçler we sahypalama bilen almak
 */
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await ProductService.getAllProductsService(req.query);
    res.status(200).json({
      success: true,
      ...data
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Täze haryt goşmak (Admin)
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.createProductService(req.body);
    res.status(201).json({
      success: true,
      message: 'Haryt üstünlikli goşuldy! 📦',
      product
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Harydy täzelemek (Admin - PUT)
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await ProductService.updateProductService(Number(id), req.body);
    
    res.status(200).json({
      success: true,
      message: 'Haryt üstünlikli täzelendi! ✅',
      product
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Harydy öçürmek (Admin - DELETE)
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProductService(Number(id));
    
    res.status(200).json({
      success: true,
      message: 'Haryt bazadan öçürildi! 🗑️'
    });
  } catch (err) {
    next(err);
  }
};
