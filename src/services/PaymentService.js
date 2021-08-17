const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListService");
logger.level = config.get("log.level");

const { cache, getCache, getCachePattern, getCacheOrFetch } = require('../utils/CacheUtil')

const Payment = require("../entities/Payment");
const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	findByWl: async function (wl) {
		const fetchFunction = async (wl) => {
			return await Payment.where("wl").equals(wl);	
		}
		return getCacheOrFetch('payment','byWl', wl, fetchFunction(wl))
	},
    findOne: async function (id) {
		const fetchFunction = async (id) => {
			return await Payment.findById(id);
		}
		return getCacheOrFetch('payment', 'get', id, fetchFunction(id));
	},
	store: async function (data) {
		try {
			const newItem = await Payment.create(data);
			cache.set(getCache('payment','get', newItem._id), JSON.stringify(newItem));
			cache.del(getCachePattern('payment','byWl'));
			return newItem;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsConflict(error);
		}
	},
	edit: async function (id, request) {
		try {
			const payment = await Payment.findById(id);
			if (!payment) {
				throw new Error("empty");
			}
    
            payment.name = request.name ? request.name : payment.name;
            payment.codeCompta = request.codeCompta ? request.codeCompta : payment.codeCompta;

			const updated = await payment.save();
			console.log(payment.wl)
			cache.set(getCache('payment','get',updated._id), JSON.stringify(updated));
			cache.del(getCachePattern('payment','byWl',payment.wl));

			return updated;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
	destroy: async function (id) {
		try {

			cache.del(getCache('payment','get',id));
			cache.del(getCachePattern('payment','byWl'));
			return await Payment.deleteOne({ _id: id })
		} catch (error) {
			logger.debug('destroy method',error)
			ResponseUtils.errorsNotFound();
		}
	},
};
