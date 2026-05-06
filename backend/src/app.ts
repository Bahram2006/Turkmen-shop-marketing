import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './config/db';
import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/product.routes';
import cartRoutes from './modules/cart/cart.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.send(`🚀 E-Buy Backend işleýär! Baza wagty: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('❌ Baza baglananda säwlik boldy!');
  }
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} portunda işläp başlady!`);
});
