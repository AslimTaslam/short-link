import { Router } from 'express';
import {
  registerValidation,
  loginValidation,
} from '../middleware/validation-middleware.js';
import {
  registerController,
  authController,
} from '../controllers/auth-controllers.js';

const router = Router();

// /auth/register
router.post('/register', registerValidation, registerController);

// /auth/login
router.post('/login', loginValidation, authController);

export { router as authRouter };
