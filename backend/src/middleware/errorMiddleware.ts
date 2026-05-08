import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  
  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message || 'Serwerde garaşylmadyk säwlik boldy!',
    // Diňe development wagty nirede ýalňyşlyk bolanyny görmek üçin:
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
