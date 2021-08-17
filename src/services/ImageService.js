const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListService");
logger.level = config.get("log.level");

const Image = require("../entities/Image");
const ResponseUtils = require("../utils/ResponseUtil");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const { gfs } = require('../utils/StorageUtil');

module.exports = {
	store: async (data) => {
		try {
			return await Image.create(data);
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsConflict(error);
		}
	},

	findAll: async () => {
		return await Image.find();		
	},

	findById: async (id) => {
		return await Image.findById(id);
	},

	findByWL: async (wl) => {
		return await Image.where("wlId").equals(wl);
	},

	findByRelatedEntityAndWL: async (relatedEntityId, relatedEntityType, wl) => {
		return await Image.find({
				"wlId": wl,
				"relatedEntityId": relatedEntityId,
				"relatedEntityType": relatedEntityType,
			});
	},

	destroy: async (id) => {
		return await Image.deleteOne({ _id: id })
	}
};
