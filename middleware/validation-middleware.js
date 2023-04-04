import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('email', 'Uncorrect your email').isEmail(),
  body('password', 'Password must be at least 6 chars long').isLength({
    min: 6,
  }),
  body('name', 'Name must be at least 3 chars long').isLength({ min: 3 }),
  (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: errors.errors[0].msg,
        });

        return;
      }
      next();
    } catch (err) {
      console.error(err.message);
    }
  },
];

export const loginValidation = [
  body('email', 'Uncorrect your email').isEmail().normalizeEmail(),
  body('password', 'Password must be at least 6 chars long').isLength({
    min: 6,
  }),
  (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorrect your login data, try again',
        });
      }
      next();
    } catch (err) {
      console.error(err.message);
    }
  },
];
