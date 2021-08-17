const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListController");
logger.level = config.get("log.level");

const PaymentService = require("../../services/PaymentService");
const PaymentRequest = require("../../requests/PaymentRequest");
const ResponseUtils = require("../../utils/ResponseUtil");

const { validationResult } = require("express-validator");

module.exports = {
	
	getByWl: async function (req) {
		try {
			const payments = await PaymentService.findByWl(req.params.wl);
			ResponseUtils.success(payments);
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},
    getById: async function (req) {
		try {
			const payment = await PaymentService.findOne(req.params.id);
			ResponseUtils.success(payment);
		} catch (error) {
			logger.debug("error", error);
			return ResponseUtils.errorsNotFound();
		}
	},
	store: async function (req) {
		if (PaymentRequest.check(validationResult(req)) !== true) {
			return;
		}
		try {
			const newPayment = await PaymentService.store(req.body);
			ResponseUtils.successCreated(newPayment);
		} catch (error) {
			logger.debug("store error : ", error);
		}
	},
	edit: async function (req) {
		try {
			const paymentEdited = await PaymentService.edit(req.params.id, req.body);
			ResponseUtils.successEdited(req.params.id, req.body, paymentEdited);
		} catch (error) {
			ResponseUtils.errorsNotFound();
			logger.debug("edit error : ", error);
		}
	},
    destroy: async function (req) {
        try {
          await PaymentService.destroy(req.params.id)
          ResponseUtils.successNoContent()
        } catch (error) {
           logger.debug('destroy error : ', error);
        }
      },
};
