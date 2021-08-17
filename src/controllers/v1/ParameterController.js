const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListController");
logger.level = config.get("log.level");

const ParameterService = require("../../services/ParameterService");
const ParameterRequest = require("../../requests/ParameterRequest");
const ResponseUtils = require("../../utils/ResponseUtil");

const { validationResult } = require("express-validator");

module.exports = {
	
	getParameters: async (req) => {
		ResponseUtils.success(await ParameterService.get(req.params))
	},

  	getParameterById: async (req) => {
		try {
			ResponseUtils.success(await ParameterService.getById(req.params.id));
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},

  	getSection: async (req) => {
		try {
			ResponseUtils.success(await ParameterService.getBySection(req.params));
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},

	getKey: async (req) => {
		try {
			ResponseUtils.success(await ParameterService.getByKey(req.params));
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},

	createParameter: async (req) => {
		if (ParameterRequest.check(validationResult(req)) !== true) {
			return
		}
		try { 
			const newParameter = await ParameterService.create(req.body)
			ResponseUtils.successCreated(newParameter)
		} catch (error) {
			logger.debug("store error : ", error)
		} 
	},

	modifyParameter: async (req) => {
		try { 
			const editParameter = await ParameterService.modify(req.params.id, req.body)
			ResponseUtils.successEdited(req.params.id, req.body, editParameter)
		} catch (error) {
			logger.debug("store error : ", error)
		} 
  	}

}; 