const { Router } = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth-middleware");

const router = Router();

// Get user
router.get("/", auth, async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await pool.query(
			"SELECT * FROM auth_user WHERE user_id = $1",
			[userId]
		);
		const email = user.rows[0].email;
		const name = user.rows[0].name;

		res.status(201).json({ email, name });
	} catch (err) {
		console.error(err.message);
	}
});

// Edit user
router.put("/", auth, async (req, res) => {
	try {
		const { userId } = req.user;
		const { email, name, newPassword, oldPassword } = req.body;
		if (email && name) {
			const editUser = pool.query(
				"UPDATE auth_user SET email = $1, name = $2 WHERE user_id = $3 RETURNING *",
				[email, name, userId]
			);
		}

		const user = await pool.query(
			"SELECT * FROM auth_user WHERE user_id = $1",
			[userId]
		);

		if (!newPassword && !oldPassword) {
			res.status(400).json({ message: "Uncorrect password" });
		}

		const isMatch = await bcrypt.compare(oldPassword, user.rows[0].password);
		if (!isMatch) {
			res.status(400).json({ message: "Uncorrect old password" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 12);

		const editUser = await pool.query(
			"UPDATE auth_user SET password = $1 WHERE user_id = $2 RETURNING *",
			[hashedPassword, userId]
		);

		res.json(editUser);
	} catch (err) {
		console.error(err.message);
	}
});

// Delete user
router.delete("/", auth, async (req, res) => {
	const { userId } = req.user;
	await pool.query("DELETE FROM auth_user WHERE user_id = $1", [userId]);
	res.json({ message: "User has been deleted" });
	try {
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
