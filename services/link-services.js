import pool from '../database/db.js';

export const getLinkByUrl = async (linkUrl) => {
  try {
    const link = await pool.query('SELECT * FROM link WHERE link = $1', [
      linkUrl,
    ]);
    return link;
  } catch (error) {
    return error;
  }
};

export const createLink = async (userId, linkUrl, shortLink, code) => {
  try {
    const link = await pool.query(
      'INSERT INTO link (user_id, link, short_link, code) VALUES($1, $2, $3, $4) RETURNING *',
      [userId, linkUrl, shortLink, code]
    );
    return link;
  } catch (error) {
    return error;
  }
};

export const getLinksByUserId = async (userId) => {
  try {
    const links = await pool.query('SELECT * FROM link WHERE user_id = $1', [
      userId,
    ]);
    return links;
  } catch (error) {
    return error;
  }
};

export const getLinkByCode = async (code) => {
  try {
    const link = await pool.query('SELECT * FROM link WHERE code = $1', [code]);
    return link;
  } catch (error) {
    return error;
  }
};

export const deleteLinkByCode = async (code) => {
  try {
    await pool.query('DELETE FROM link WHERE code = $1', [code]);
    return {
      message: 'Link deleted',
    };
  } catch (error) {
    return error;
  }
};

export const addClickToLinkByCode = async (incClicks, code) => {
  try {
    await pool.query('UPDATE link SET clicks = $1 WHERE code = $2', [
      incClicks,
      code,
    ]);
    return {
      message: 'Click added',
    };
  } catch (error) {
    return error;
  }
};
