const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListController");
logger.level = config.get("log.level");

const VatRateService = require("../../services/VatRateService");
const VatRateRequest = require("../../requests/VatRateRequest");
const ResponseUtils = require("../../utils/ResponseUtil");

const { validationResult } = require("express-validator");

module.exports = {
	
	getById: async function (req) {
		try {
			const vatRate = await VatRateService.findOne(req.params.id);
			ResponseUtils.success(vatRate);
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
	getByWl: async function (req) {
		try {
			const vatRate = await VatRateService.findByWl(req.params.wl);
			ResponseUtils.success(vatRate);
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},
	store: async function (req) {
		if (VatRateRequest.check(validationResult(req)) !== true) {
			return;
		}

		try {
			const newVatRate = await VatRateService.store(req.body);
			ResponseUtils.successCreated(newVatRate);
		} catch (error) {
			logger.debug("store error : ", error);
		}
	},
	edit: async function (req) {
		try {
			const vatRateEdited = await VatRateService.edit(req.params.id, req.body);
			ResponseUtils.successEdited(req.params.id, req.body, vatRateEdited);
		} catch (error) {
			ResponseUtils.errorsNotFound();
			logger.debug("edit error : ", error);
		}
	},
    destroy: async function (req) {
        try {
          await VatRateService.destroy(req.params.id)
          ResponseUtils.successNoContent()
        } catch (error) {
           logger.debug('destroy error : ', error);
        }
      },
};
