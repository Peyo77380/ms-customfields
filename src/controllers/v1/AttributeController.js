const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListController");
logger.level = config.get("log.level");

const AttributeService = require("../../services/AttributeService");
const AttributeRequest = require("../../requests/AttributeRequest");
const ResponseUtils = require("../../utils/ResponseUtil");

const { validationResult } = require("express-validator");

module.exports = {
	
	getByWlAndLang: async function (req) {
		try {
			const attribute = await AttributeService.findByWlAndLang(req.params.wl,req.params.lang);
			ResponseUtils.success(attribute);
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},
    getById: async function (req) {
		try {
			const attribute = await AttributeService.findOne(req.params.id);
			ResponseUtils.success(attribute);
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
	store: async function (req) {
		if (AttributeRequest.check(validationResult(req)) !== true) {
			return;
		}
		try {
			const newAttribute = await AttributeService.store(req.body);
			ResponseUtils.successCreated(newAttribute);
		} catch (error) {
			logger.debug("store error : ", error);
		}
	},
	edit: async function (req) {
		try {
			const attributeEdited = await AttributeService.edit(req.params.id, req.body);
			ResponseUtils.successEdited(req.params.id, req.body, attributeEdited);
		} catch (error) {
			ResponseUtils.errorsNotFound();
			logger.debug("edit error : ", error);
		}
	},
    destroy: async function (req) {
        try {
          await AttributeService.destroy(req.params.id)
          ResponseUtils.successNoContent()
        } catch (error) {
           logger.debug('destroy error : ', error);
        }
      },
};
