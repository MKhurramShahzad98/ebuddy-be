// routes/authRoutes.ts
import { Router } from 'express';
import { signUp, signIn, logout } from '../controllers/authController';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', logout);

export default router;
