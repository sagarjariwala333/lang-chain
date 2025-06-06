import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Login route
router.post('/login', authController.login);

// Verify token route
router.get('/verify', authController.verifyToken);

export default router; 