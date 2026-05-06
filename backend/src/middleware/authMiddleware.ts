import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  // 1. Token bararmy diýip barlamak (Header-den alýarys)
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token tapylmady, rugsat ýok!' });
  }

  try {
    // 2. Tokeny barlamak
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded; // Ulanyjynyň maglumatlaryny (id, role) request-e goşýarys
    next(); // Hemme zat gowy bolsa, indiki funksiýa geç
  } catch (err) {
    return res.status(401).json({ message: 'Nädogry token!' });
  }
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  // Ulanyjynyň roly 'admin' bolsa dowam etmeli
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Bu amal üçin Admin hukugy gerek!' });
  }
};
