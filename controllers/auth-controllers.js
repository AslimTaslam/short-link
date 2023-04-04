import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../services/user-services.js';

export const registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const condidate = await getUserByEmail(email);
    if (condidate.rowCount > 0) {
      res.status(400).json({ message: 'Someone already uses this email' });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await createUser(email, hashedPassword, name);

    res.status(201).json({ message: 'New user has been created' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const authController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (user && user.rowCount === 0) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      res.status(400).json({ message: 'Uncorrect password' });

      return;
    }

    const token = jwt.sign(
      { userId: user.rows[0].user_id },
      config.get('jwtSecret'),
      { expiresIn: '7d' }
    );

    res.json({ token, userId: user.rows[0].user_id });
  } catch (error) {
    res.status(500).json({ error });
  }
};
