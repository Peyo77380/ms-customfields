const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListService");
logger.level = config.get("log.level");

const Attribute = require("../entities/Attribute");
const ResponseUtils = require("../utils/ResponseUtil");
const {
	getCacheOrFetch,
	cache,
	getCache,
	getCachePattern,
} = require("../utils/CacheUtil");

const fetchFunctionfindByWlAndLang = async (wl, lang) => {
	return await Attribute.where("wl").equals(wl).where("lang").equals(lang);
};

const fetchFunction = async (id) => {
	return await Attribute.findById(id);
};

module.exports = {
	findByWlAndLang: async function (wl, lang) {
		return getCacheOrFetch(
			"attribute",
			"byWL_Lang",
			`${wl}_${lang}`,
			fetchFunctionfindByWlAndLang(wl, lang)
		);
	},
	findOne: async function (id) {
		
		return getCacheOrFetch("attribute", "get", id, fetchFunction(id));
	},
	store: async function (data) {
		const existing = await Attribute.findOne({ key : data.key, wl: data.wl, lang: data.lang });

		if (existing) {
			return ResponseUtils.errorsConflict("Key already exists");
		}
		try {
			const newItem = await Attribute.create(data);
			cache.set(
				getCache("attribute", "get", newItem._id),
				JSON.stringify(newItem)
			);
			cache.del(getCachePattern("attribute", "byWL_Lang", `${newItem.wl}_${newItem.lang}`));
			return newItem;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsConflict(error);
		}
	},
	edit: async function (id, request) {
		try {
			const attribute = await Attribute.findById(id);
			if (!attribute) {
				throw new Error("empty");
			}

			attribute.name = request.name ? request.name : attribute.name;
			attribute.datas = request.datas ? request.datas : attribute.datas;
			attribute.unity = request.unity ? request.unity : attribute.unity;

			await attribute.save();

			cache.set(
				getCache("attribute", "get", attribute._id),
				JSON.stringify(attribute)
			);
			cache.del(getCachePattern("attribute", "byWL_Lang", `${attribute.wl}_${attribute.lang}`));
			return attribute;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
	destroy: async function (id) {
		try {
			const item = await Attribute.findById(id);
			if (!item) {
				throw new Error("empty");
			}
			cache.del(getCache("attribute", "get", id));
			cache.del(getCachePattern("attribute", "byWL_Lang", `${item.wl}_${item.lang}`));
			return await Attribute.deleteOne({ _id: id });
		} catch (error) {
			logger.debug("destroy method", error);
			ResponseUtils.errorsNotFound();
		}
	},
};
