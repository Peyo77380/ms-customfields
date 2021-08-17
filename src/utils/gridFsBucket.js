const mongoose = require("mongoose");
const dotenv = require("dotenv");

const url = dotenv.config().parsed.MONGODNS;

const connect = mongoose.createConnection(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = {
	connect,
	mongoose,
};
