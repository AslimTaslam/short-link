import jwt from 'jsonwebtoken';
import config from 'config';

export const auth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    //Check token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorization' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err.message);
  }
};
