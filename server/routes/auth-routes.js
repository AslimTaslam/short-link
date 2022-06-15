const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");

const pool = require("../db.js");

const router = Router();

// /auth/register
router.post(
	"/register",
	[
		body("email", "Uncorrect your email").isEmail(),
		body("password", "Password must be at least 6 chars long").isLength({ min: 6 }),
		body("name", "Name must be at least 3 chars long").isLength({ min: 3 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: errors.errors[0].msg,
				});
			}
			const { email, password, name } = req.body;

			//change userDB
			const condidate = await pool.query(
				"SELECT * FROM auth_user WHERE email = $1",
				[email]
			);
			if (condidate.rowCount > 0) {
				return res
					.status(400)
					.json({ message: "Someone already uses this email" });
			}

			//hash pass
			const hashedPassword = await bcrypt.hash(password, 12);

			//create user
			const newUser = await pool.query(
				"INSERT INTO auth_user (email, password, name) VALUES($1, $2, $3) RETURNING *",
				[email, hashedPassword, name]
			);

			res.status(201).json({ message: "New user has been created" });
		} catch (err) {
			console.error(err.message);
		}
	}
);

// /auth/login
router.post(
	"/login",
	[
		body("email", "Uncorrect your email").isEmail().normilizeEmail(),
		body("password", "Password must be at least 6 chars long").isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpry()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Uncorrect your login data, try again",
				});
			}

			const { email, password } = req.body;
			
			console.log("email", email);
			console.log("password", password);
		
			//find user with this email
			//const user = await pool.query("SELECT * FROM auth_user WHERE email = $1", [email]);

			//match password

			//create jwt




		} catch (err) {
			console.error(err);
		}
	}
);

module.exports = router;
