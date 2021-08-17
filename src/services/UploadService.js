const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListService");
logger.level = config.get("log.level");

const Image = require("../entities/Image");
const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	findById: async (id) => {
		return await Upload.findById(id);
	},

	destroy: async (id) => {
		return await Upload.deleteOne({ _id: id })
	}
};
