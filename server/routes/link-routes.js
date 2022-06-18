const { Router } = require("express");
const pool = require("../db");
const auth = require("../middleware/auth-middleware");

const router = Router();

//Create link
router.post("/generate", auth, async (req, res) => {
	try {
	} catch (err) {
		console.error(err.message);
	}
});

//Get links
router.get("/", auth, async (req, res) => {
	try {
	} catch (err) {
		console.error(err.message);
	}
});

//Get a link
router.get("/:id", auth, async (req, res) => {
	try {
	} catch (err) {
		console.error(err.message);
	}
});

//Delete a link
router.delete("/:id", auth, async (req, res) => {
	try {
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
