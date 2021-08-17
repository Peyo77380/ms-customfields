const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("GlobalController");
logger.level = config.get("log.level");

const ResponseUtils = require("../../utils/ResponseUtil");
const GlobalService = require("../../services/GlobalService");

module.exports = {
	get: async function () {
		try {
			const GlobalCats = await GlobalService.find();
			ResponseUtils.success(GlobalCats);
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
};
