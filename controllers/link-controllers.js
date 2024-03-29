import config from 'config';
import shortid from 'shortid';
import {
  getLinkByUrl,
  createLink,
  getLinksByUserId,
  getLinkByCode,
  deleteLinkByCode,
} from '../services/link-services.js';

export const createLinkController = async (req, res) => {
  try {
    const { linkUrl } = req.body;
    const { userId } = req.user;

    const exist = await getLinkByUrl(linkUrl);
    if (exist.rowCount > 0) {
      res.json(exist.rows[0]);

      return;
    }

    const code = shortid.generate(10);
    const shortLink = config.get('baseUrl') + '/s/' + code;

    const newLink = await createLink(userId, linkUrl, shortLink, code);

    res.status(201).json(newLink.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getLinksController = async (req, res) => {
  try {
    const { userId } = req.user;
    const links = await getLinksByUserId(userId);
    if (links.rowCount === 0) {
      res.status(400).json({ message: 'Not founf links' });

      return;
    }
    res.status(201).json(links.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getLinkController = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await getLinkByCode(code);
    if (link.rowCount === 0) {
      res.status(400).json({ message: 'Link not found' });

      return;
    }
    res.status(201).json(link.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteLinkController = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await getLinkByCode(code);
    if (link.rowCount === 0) {
      res.status(400).json({ message: 'Link not found' });

      return;
    }
    await deleteLinkByCode(code);
    res.status(201).json({ message: 'Link has been deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
