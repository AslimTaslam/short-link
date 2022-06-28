const express = require("express");
const cors = require("cors");
const config = require("config");

const app = express();
const PORT = process.env.PORT || config.get("port");

//middleware
app.use(cors());
app.use(express.json());

//middlerware routes
app.use("/api/auth", require("./routes/auth-routes"));
app.use("/api/user", require("./routes/user-routes"));
app.use("/api/link", require("./routes/link-routes"));
app.use("/s", require("./routes/redirect-routes"));

app.listen(PORT, () => {
	console.log(`Server start on ${PORT}`);
});
