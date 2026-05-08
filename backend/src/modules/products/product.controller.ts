import { Request, Response } from 'express';
import * as ProductService from './product.service';

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Query parametrlerini service-e ugradýarys
    const data = await ProductService.getAllProductsService(req.query);
    
    res.status(200).json({
      success: true,
      ...data
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.createProductService(req.body);
    res.status(201).json({
      success: true,
      message: 'Haryt üstünlikli goşuldy! 📦',
      product
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
