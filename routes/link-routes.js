import { Router } from 'express';
import config from 'config';
import shortid from 'shortid';
import pool from '../database/db.js';
import { auth } from '../middleware/auth-middleware.js';

import {
  getLinkByUrl,
  createLink,
  getLinksByUserId,
  getLinkByCode,
  deleteLinkByCode,
} from '../services/link-services.js';

const router = Router();

//Create link
router.post('/generate', auth, async (req, res) => {
  try {
    const { linkUrl } = req.body;
    const { userId } = req.user;

    const exist = await getLinkByUrl(linkUrl);
    if (exist.rowCount > 0) {
      return res.json(exist.rows[0]);
    }

    const code = shortid.generate(10);
    const shortLink = config.get('baseUrl') + '/s/' + code;

    const newLink = await createLink(userId, linkUrl, shortLink, code);

    res.status(201).json(newLink.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Get links
router.get('/', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const links = await getLinksByUserId(userId);
    if (links.rowCount === 0) {
      res.status(400).json({ message: 'Not founf links' });
    }
    res.status(201).json(links.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get a link
router.get('/:code', auth, async (req, res) => {
  try {
    const { code } = req.params;
    const link = await getLinkByCode(code);
    if (link.rowCount === 0) {
      return res.status(400).json({ message: 'Link not found' });
    }
    res.status(201).json(link.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a link
router.delete('/:code', auth, async (req, res) => {
  try {
    const { code } = req.params;
    const link = await getLinkByCode(code);
    if (link.rowCount === 0) {
      res.status(400).json({ message: 'Link not found' });
    }
    await deleteLinkByCode(code);
    res.status(201).json({ message: 'Link has been deleted' });
  } catch (err) {
    console.error(err.message);
  }
});

export { router as linkRouter };
