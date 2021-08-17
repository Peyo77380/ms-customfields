const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("GlobalService");
logger.level = config.get("log.level");
var ObjectID = require("mongodb").ObjectID;

const Global = require("../entities/Global");
const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	find: async function () {
		return await Global.find();
	},
};
