const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("EmailService");
logger.level = config.get("log.level");

const Email = require("../entities/Email");
const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	findOne: async function (id) {
		return await Email.findById(id);
	},
	findByWlAndLang: async function (params) {
		return await Email.find({"wl":params.wl, "lang": params.lang})
	},
 	store: async function (data) {
		try {
			return await Email.create(data);
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsConflict(error);
		}
	}, 
    edit: async function (id, request) {
		try {
			const email = await Email.findById(id)
			if (!email) {
			  throw new Error('empty');
			}
			
/* 			email.section = request.section ? request.section : email.section
			email.key = request.key ? request.key : email.key
            email.wl = request.wl ? request.wl : email.wl
            email.lang = request.lang ? request.lang : email.lang */
            email.info = request.info ? request.info : email.info
            email.title = request.title ? request.title : email.title
            email.description = request.description  ? request.description  : email.description 
            email.content = request.content  ? request.content  : email.content 
            email.emailCopy = request.emailCopy ? request.emailCopy  : email.emailCopy
            email.hiddenCopy = request.hiddenCopy ? request.hiddenCopy  : email.hiddenCopy 
			email.variable = request.variable ? request.variable  : email.variable 
            
			return await email.save()
		} catch (error) {
			logger.debug(error)
			ResponseUtils.errorsNotFound();
		}
	}
};
