import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  // Terminalda barla: Header gelýärmi?
  console.log("Gelen Header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token tapylmady ýa-da formaty ýalňyş!' });
  }

  // "Bearer TOKEN_KODY" diýen ýerden diňe TOKEN_KODY-ny alýarys
  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'admin123');
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ message: 'Nädogry ýa-da möhleti geçen token!' });
  }
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  // Şuny hökman goş we terminaly barla:
  console.log("BARLANYLÝAN ULANYJY:", req.user); 

  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Bu amal üçin Admin hukugy gerek!' });
  }
};

