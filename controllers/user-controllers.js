import bcrypt from 'bcryptjs';
import {
  getUserById,
  editUserNameById,
  editUserEmailById,
  deleteUserById,
} from '../services/user-services.js';

export const getUserController = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getUserById(userId);
    const email = user.rows[0].email;
    const name = user.rows[0].name;

    res.status(201).json({ email, name });
  } catch (err) {
    console.error(err.message);
  }
};

export const editUserController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { email, name, newPassword, oldPassword } = req.body;

    if (name) {
      const editUser = await editUserNameById(name, userId);

      return;
    }
    if (email) {
      const editUser = await editUserEmailById(email, userId);

      return;
    }

    const user = await getUserById(userId);

    if (!newPassword && !oldPassword) {
      res.status(400).json({ message: 'Uncorrect password' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.rows[0].password);
    if (!isMatch) {
      res.status(400).json({ message: 'Uncorrect old password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const editUser = await editUserPasswordById(hashedPassword, userId);

    res.json(editUser);
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteUserController = async (req, res) => {
  const { userId } = req.user;
  await deleteUserById(userId);
  res.json({ message: 'User has been deleted' });
  try {
  } catch (err) {
    console.error(err.message);
  }
};
