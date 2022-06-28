const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const pool = require("../db");
const auth = require("../middleware/auth-middleware");

const router = Router();

//Create link
router.post("/generate", auth, async (req, res) => {
	try {
		const { link_url } = req.body;
		const { userId } = req.user;

		const exist = await pool.query("SELECT * FROM link WHERE link = $1", [
			link_url,
		]);
		if (exist.rowCount > 0) {
			return res.json(exist.rows[0]);
		}

		const code = shortid.generate(10);
		const shortLink = config.get("baseUrl") + "/s/" + code;

		const newLink = await pool.query(
			"INSERT INTO link (user_id, link, short_link, code) VALUES($1, $2, $3, $4) RETURNING *",
			[userId, link_url, shortLink, code]
		);

		res.status(201).json(newLink.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//Get links
router.get("/", auth, async (req, res) => {
	try {
		const { userId } = req.user;
		const links = await pool.query("SELECT * FROM link WHERE user_id = $1", [
			userId,
		]);
		if (links.rowCount === 0) {
			res.status(400).json({ message: "Not founf links" });
		}
		res.status(201).json(links.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//Get a link
router.get("/:code", auth, async (req, res) => {
	try {
		const { code } = req.params;
		const link = await pool.query("SELECT * FROM link WHERE code = $1", [code]);
		if (link.rowCount === 0) {
			return res.status(400).json({ message: "Link not found" });
		}
		res.status(201).json(link.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//Delete a link
router.delete("/:code", auth, async (req, res) => {
	try {
		const { code } = req.params;
		const link = await pool.query("SELECT * FROM link WHERE code = $1", [code]);
		if (link.rowCount === 0) {
			res.status(400).json({ message: "Link not found" });
		}
		await pool.query("DELETE FROM link WHERE code = $1", [code]);
		res.status(201).json({ message: "Link has been deleted" });
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
