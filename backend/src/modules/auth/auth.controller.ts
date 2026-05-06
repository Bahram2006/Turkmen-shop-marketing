import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../../config/db';

/**
 * @desc    Täze ulanyjy hasaba almak (Register)
 * @route   POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;

  try {
    // 1. Ulanyjy bararmy diýip barlamak
    const userExists = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Bu email öň hasaba alnan!' });
    }

    // 2. Paroly şifrlemek
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Bazada täze ulanyjy döretmek
    const newUser = await query(
      'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email, role',
      [full_name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'Registrasiýa üstünlikli boldy!',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Serverde säwlik boldy!' });
  }
};

/**
 * @desc    Ulgama giriş (Login)
 * @route   POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. Ulanyjyny email arkaly tapmak
    const userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Email ýa-da parol ýalňyş!' });
    }

    const user = userResult.rows[0];

    // 2. Paroly barlamak (bcrypt.compare)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ýa-da parol ýalňyş!' });
    }

    // 3. JWT Token döretmek (1 günlük möhlet bilen)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    // 4. Jogap bermek (paroly görkezmezlik üçin aýry saklaýarys)
    res.status(200).json({
      message: 'Giriş üstünlikli!',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Serverde säwlik boldy!' });
  }
};
