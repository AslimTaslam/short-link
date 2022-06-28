const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/:code", async (req, res) => {
	try {
		const { code } = req.params;

		const link = await pool.query("SELECT * FROM link WHERE code = $1", [code]);

		if (link.rowCount > 0) {
			let incClicks = +link.rows[0].clicks + 1;
			console.log(incClicks);
			await pool.query("UPDATE link SET clicks = $1 WHERE code = $2", [
				incClicks,
				code,
			]);

			return res.redirect(link.rows[0].link);
		}
		res.status(400).json({ message: "Link not found" });
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
