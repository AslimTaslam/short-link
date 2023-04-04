import pool from '../database/db.js';

export const getUserById = async (id) => {
  try {
    const user = await pool.query(
      'SELECT * FROM auth_user WHERE user_id = $1',
      [id]
    );
    return user;
  } catch (error) {
    return error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await pool.query('SELECT * FROM auth_user WHERE email = $1', [
      email,
    ]);
    return user;
  } catch (error) {
    return error;
  }
};

export const createUser = async (email, hashedPassword, name) => {
  try {
    const user = await pool.query(
      'INSERT INTO auth_user (email, password, name) VALUES($1, $2, $3) RETURNING *',
      [email, hashedPassword, name]
    );
  } catch (error) {
    return error;
  }
};

export const editUserNameById = async (name, userId) => {
  try {
    const user = await pool.query(
      'UPDATE auth_user SET name = $1 WHERE user_id = $2 RETURNING *',
      [name, userId]
    );
    return user;
  } catch (error) {
    return error;
  }
};

export const editUserEmailById = async (email, userId) => {
  try {
    const user = await pool.query(
      'UPDATE auth_user SET email = $1 WHERE user_id = $2 RETURNING *',
      [email, userId]
    );
    return user;
  } catch (error) {
    return error;
  }
};

export const editUserPasswordById = async (hashedPassword, userId) => {
  try {
    const user = await pool.query(
      'UPDATE auth_user SET password = $1 WHERE user_id = $2 RETURNING *',
      [hashedPassword, userId]
    );
    return user;
  } catch (error) {
    return error;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const user = await pool.query('DELETE FROM auth_user WHERE user_id = $1', [
      userId,
    ]);
    return user;
  } catch (error) {
    return error;
  }
};
