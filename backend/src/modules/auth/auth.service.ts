import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

/**
 * @desc Ulanyjy hasaba almak (Register)
 */
export const registerUserService = async (full_name: string, email: string, password: string) => {
  // 1. Email öň barmy diýip barlaýarys
  const userExists = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (userExists.rows.length > 0) {
    throw new Error('Bu email eýýäm hasaba alnan!');
  }

  // 2. Paroly şifrlemek
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Täze ulanyjyny bazada döretmek
  const newUser = await query(
    'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email, role',
    [full_name, email.toLowerCase(), hashedPassword]
  );

  return newUser.rows[0];
};

/**
 * @desc Ulgama giriş (Login)
 */
export const loginUserService = async (email: string, password: string) => {
  // 1. Ulanyjyny tapmak
  const userResult = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
  const user = userResult.rows[0];

  if (!user) {
    throw new Error('Email ýa-da parol ýalňyş!');
  }

  // 2. Paroly barlamak
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email ýa-da parol ýalňyş!');
  }

  // 3. JWT Token döretmek
  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    }
  };
};
