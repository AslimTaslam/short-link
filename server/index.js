const express = require("express");
const cors = require("cors");
const config = require("config");

const app = express();
const PORT = process.env.PORT || config.get("port");


//middleware
app.use(cors());
app.use(express.json());

//middlerware routes
app.use("/auth", require("./routes/auth-routes"));
app.use("/link", require("./routes/link-routes"));

app.listen(PORT, () => {
	console.log(`Server start on ${PORT}`);
});
