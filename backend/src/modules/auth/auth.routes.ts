import { Router } from 'express';
import { register, login } from './auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login); // Login ýoluny goşduk

export default router;
