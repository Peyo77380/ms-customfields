const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("EmailService");
logger.level = config.get("log.level");

const EmailService = require("../../services/EmailService");
const EmailRequest = require("../../requests/EmailRequest");
const ResponseUtils = require("../../utils/ResponseUtil");

const { validationResult } = require("express-validator");

module.exports = {
	
    get: async function (req) {
		try {
			const Email = await EmailService.findOne(req.params.id);
			ResponseUtils.success(Email);
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
  getByWlAndLang: async function (req) {
    try {
        const Email = await EmailService.findByWlAndLang(req.params);
        ResponseUtils.success(Email);
    } catch (error) {
        return ResponseUtils.errorsNotFound();
    }
    },	
    store: async function (req) {
		if (EmailRequest.check(validationResult(req)) !== true) {
			return;
		}

		try {
			const newEmail = await EmailService.store(req.body);
			ResponseUtils.successCreated(newEmail);
		} catch (error) {
			logger.debug("store error : ", error);
		}
	},
    edit: async function (req) {
        try {
          const EmailEdited = await EmailService.edit(req.params.id, req.body);
          ResponseUtils.successEdited(req.params.id, req.body, EmailEdited);
    
        } catch (error) {
          ResponseUtils.errorsNotFound();
           logger.debug('edit error : ', error);
        }
      }

}
