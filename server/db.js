const {Pool} = require("pg");

const pool = new Pool({
	user: "postgres",
	password: "yourpassword",
	host: "localhost",
	port: 5432,
	database: "short_link",
});

module.exports = pool;
