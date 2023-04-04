import {
  getLinkByCode,
  addClickToLinkByCode,
} from '../services/link-services.js';

export const redirectController = async (req, res) => {
  try {
    const { code } = req.params;

    const link = await getLinkByCode(code);

    if (link.rowCount > 0) {
      let incClicks = +link.rows[0].clicks + 1;
      console.log(incClicks);
      await addClickToLinkByCode(incClicks, code);

      return res.redirect(link.rows[0].link);
    }
    res.status(400).json({ message: 'Link not found' });
  } catch (err) {
    console.error(err.message);
  }
};
