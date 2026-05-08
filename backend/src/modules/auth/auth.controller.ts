import { Request, Response } from 'express';
import { registerUserService, loginUserService } from './auth.service';

/**
 * @desc Register Controller
 */
export const register = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;

  // Maglumatlaryň barlygyny barlamak (Validation)
  if (!full_name || !email || !password || password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Maglumatlary doly we dogry giriziň (Parol min. 6 harp)!' 
    });
  }

  try {
    const user = await registerUserService(full_name, email, password);
    res.status(201).json({
      success: true,
      message: 'Registrasiýa üstünlikli boldy! 🎉',
      user
    });
  } catch (err: any) {
    res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }
};

/**
 * @desc Login Controller
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email we paroly giriziň!' 
    });
  }

  try {
    const data = await loginUserService(email, password);
    res.status(200).json({
      success: true,
      message: 'Giriş üstünlikli! 🚀',
      ...data
    });
  } catch (err: any) {
    res.status(401).json({ 
      success: false, 
      message: err.message 
    });
  }
};
