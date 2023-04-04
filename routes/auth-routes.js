import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getUserByEmail, createUser } from '../services/user-services.js';

const router = Router();

// /auth/register
router.post(
  '/register',
  [
    body('email', 'Uncorrect your email').isEmail(),
    body('password', 'Password must be at least 6 chars long').isLength({
      min: 6,
    }),
    body('name', 'Name must be at least 3 chars long').isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.errors[0].msg,
        });
      }
      const { email, password, name } = req.body;

      //change userDB
      const condidate = await getUserByEmail(email);
      if (condidate.rowCount > 0) {
        return res
          .status(400)
          .json({ message: 'Someone already uses this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await createUser(email, hashedPassword, name);

      res.status(201).json({ message: 'New user has been created' });
    } catch (err) {
      console.error(err.message);
    }
  }
);

// /auth/login
router.post(
  '/login',
  [
    body('email', 'Uncorrect your email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 chars long').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorrect your login data, try again',
        });
      }

      const { email, password } = req.body;

      //find user with this email
      const user = await getUserByEmail(email);
      if (user && user.rowCount === 0) {
        return res.status(400).json({ message: 'User not found' });
      }

      //match password
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Uncorrect password' });
      }

      //create jwt
      const token = jwt.sign(
        { userId: user.rows[0].user_id },
        config.get('jwtSecret'),
        { expiresIn: '7d' }
      );

      res.json({ token, userId: user.rows[0].user_id });
    } catch (err) {
      console.error(err);
    }
  }
);

export { router as authRouter };
