import { Request, Response, NextFunction } from 'express';
import { registerUserService, loginUserService } from './auth.service';

/**
 * @desc    Ulanyjyny hasaba almak (Register)
 * @route   POST /api/auth/register
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { full_name, email, password } = req.body;

  // 1. Giriş maglumatlarynyň barlagy (Input Validation)
  if (!full_name || !email || !password || password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Maglumatlary doly we dogry giriziň (Parol min. 6 harp)!' 
    });
  }

  try {
    // 2. Business logikany Service arkaly ýerine ýetirýäris
    const user = await registerUserService(full_name, email, password);

    // 3. Şowly jogap
    res.status(201).json({
      success: true,
      message: 'Registrasiýa üstünlikli boldy! 🎉',
      user
    });
  } catch (err) {
    // 4. Ýalňyşlygy Global Error Handler-e ugradýarys
    next(err);
  }
};

/**
 * @desc    Ulgama giriş (Login)
 * @route   POST /api/auth/login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // 1. Giriş maglumatlarynyň barlagy
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email we paroly giriziň!' 
    });
  }

  try {
    // 2. Login logikasyny Service-den çagyrýarys
    const data = await loginUserService(email, password);

    // 3. Şowly jogap
    res.status(200).json({
      success: true,
      message: 'Giriş üstünlikli! 🚀',
      ...data
    });
  } catch (err) {
    // 4. Islendik ýalňyşlykda (Mysal: Parol ýalňyş bolsa) merkezi error handler işleýär
    next(err);
  }
};
