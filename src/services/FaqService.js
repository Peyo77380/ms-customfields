const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("FaqService");
logger.level = config.get("log.level");

const Faq = require("../entities/Faq");
const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	getAll: async function () {
		return await Faq.find();
	},
	findOne: async function (id) {
		return await Faq.findById(id);
	},
	findByCategory: async function (params) {
		return await Faq.find({"category":params.category})
	},
	store: async function (data) {
		try {
			return await Faq.create(data);
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsConflict(error);
		}
	},
	findByWlAndLang: async function (wl,lang) {
		return await Faq.where("wl")
			.equals(wl).where("lang").equals(lang)
	},
	edit: async function (id, request) {
		try {
			const faq = await Faq.findById(id);
			if (!faq) {
				throw new Error("empty");
			}

            faq.name = request.name ? request.name : faq.name;
            faq.question = request.question ? request.question : faq.question;
						faq.answer = request.answer ? request.answer : faq.answer;
						faq.category = request.category ? request.category : faq.category;

			await faq.save();
			return faq;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
	destroy: async function (id) {
		try {
			return await Faq.deleteOne({ _id: id })
		} catch (error) {
			logger.debug('destroy method',error)
			ResponseUtils.errorsNotFound();
		}
	},
};
