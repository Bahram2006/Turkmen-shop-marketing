import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route importlary
import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/product.routes';
import cartRoutes from './modules/cart/cart.routes';
import orderRoutes from './modules/orders/order.routes';

// Global Error Middleware importy
import { globalErrorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

// 1. Esasy Middleware-ler
app.use(cors());
app.use(express.json());

// 2. API Route-lar
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// 3. Health Check (Barlag üçin ýol)
app.get('/', (req, res) => {
  res.json({ success: true, message: '🚀 E-Buy API 10/10 işleýär!' });
});

// 4. Global Error Handler (HÖKMAN ähli route-lardan soň bolmaly!)
// Islendik ýerde 'next(err)' çagyrylsa, göni şu ýere düşer
app.use(globalErrorHandler);

export default app;
