import {
  getLinkByCode,
  addClickToLinkByCode,
} from '../services/link-services.js';

export const redirectController = async (req, res) => {
  try {
    const { code } = req.params;

    const link = await getLinkByCode(code);

    if (link.rowCount === 0) {
      res.status(400).json({ message: 'Link not found' });

      return;
    }
    let incClicks = +link.rows[0].clicks + 1;
    await addClickToLinkByCode(incClicks, code);

    res.redirect(link.rows[0].link);
  } catch (error) {
    res.status(500).json({ error });
  }
};
