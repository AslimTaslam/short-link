import { Router } from 'express';
import { auth } from '../middleware/auth-middleware.js';
import {
  getUserController,
  editUserController,
  deleteUserController,
} from '../controllers/user-controllers.js';

const router = Router();

// Get user
router.get('/', auth, getUserController);

// Edit user
router.put('/', auth, editUserController);

// Delete user
router.delete('/', auth, deleteUserController);

export { router as userRouter };
