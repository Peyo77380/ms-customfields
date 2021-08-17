const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("FaqController");
logger.level = config.get("log.level");
const ResponseUtils = require("../../utils/ResponseUtil");
const FaqRequest = require("../../requests/FaqRequest");
const FaqService = require("../../services/FaqService");
const { validationResult } = require("express-validator");

module.exports = {
	get: async function () {
		try {
			return ResponseUtils.success(await FaqService.getAll());
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
	getById: async function(req) {
		try {
			const Faq = await FaqService.findOne(req.params.id);
			ResponseUtils.success(Faq);
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
	getByWlAndLang: async function (req) {
		try {
			const faq = await FaqService.findByWlAndLang(req.params.wl,req.params.lang);
			ResponseUtils.success(faq);
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},
	getByCategory: async function (req) {
    try {
        const Faq = await FaqService.findByCategory(req.params.category);
        ResponseUtils.success(Faq);
    } catch (error) {
        return ResponseUtils.errorsNotFound();
    }
    },
	store: async function (req) {
		if (FaqRequest.check(validationResult(req)) !== true) {
			return;
		}

		try {
			const newFaq = await FaqService.store(req.body);
			ResponseUtils.successCreated(newFaq);
		} catch (error) {
			logger.debug("store error : ", error);
			return ResponseUtils.errorsNotFound();
		}
	},
	edit: async function (req) {
		try {
			const FaqEdited = await FaqService.edit(req.params.id, req.body);
			ResponseUtils.successEdited(req.params.id, req.body, FaqEdited);
		} catch (error) {
			ResponseUtils.errorsNotFound();
			logger.debug("edit error : ", error);
		}
	},
  destroy: async function (req) {
    try {
          await FaqService.destroy(req.params.id)
          ResponseUtils.successNoContent()
        } catch (error) {
           logger.debug('destroy error : ', error);
        }
      },
};
