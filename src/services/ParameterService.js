const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("EventService");
logger.level = config.get("log.level");

const Parameter = require("../entities/Parameter");
const ResponseUtils = require("../utils/ResponseUtil");
const { getCacheOrFetch, getCache, getCachePattern, cache } = require("../utils/CacheUtil");

module.exports = {
	get: async (params) => {
		const fetchFunction = async (params) => {
			return await Parameter.where("wl")
				.equals(params.wl)
				.where("lang")
				.equals(params.lang);
		}

		return getCacheOrFetch('parameter', 'byWL_Lang', `${params.wl}_${params.lang}`, fetchFunction(params));
	},
	getById: async (id) => {
		const fetchFunction = async (id) => {
			return await Parameter.findById(id);
		}
		return getCacheOrFetch('parameter', 'get', id, fetchFunction(id));
	},
	getBySection: async function (params) {
		const fetchFunction = async (params) => {
			return await Parameter.where("wl")
				.equals(params.wl)
				.where("lang")
				.equals(params.lang)
				.where("section")
				.equals(params.section);
		}
		return getCacheOrFetch(
			'parameter', 
			'byS_WL_LANG',
			`${params.section}_${params.wl}_${params.lang}`,
			fetchFunction(params)
			)
	},
	getByKey: async function (params) {
		const fetchFunction = async (params) => {
			return await Parameter.where("wl")
				.equals(params.wl)
				.where("lang")
				.equals(params.lang)
				.where("key")
				.equals(params.key);
		}
		return getCacheOrFetch(
			'parameter', 
			'byK_WL_LANG',
			`${params.key}_${params.wl}_${params.lang}`,
			fetchFunction(params)
			)
		
	},
	create: async (data) => {
		try {
			const newItem = await Parameter.create(data);
			cache.set(getCache('parameter', 'get', newItem._id), JSON.stringify(newItem)),
			cache.del(getCachePattern('parameter','byWL_Lang'));
			cache.del(getCachePattern('parameter','byS_WL_LANG'));
			cache.del(getCachePattern('parameter','byK_WL_LANG'));
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsConflict(error);
		}
	},
	modify: async (id, body) => {
		try {
			const parameter = await Parameter.findById(id);

			if (!parameter) {
				throw new Error("empty");
			}
			parameter.value = body.value ? body.value : parameter.value;
			parameter.info = body.info ? body.info : parameter.info;

			await parameter.save();
			cache.set(getCache('parameter', 'get', parameter._id), JSON.stringify(parameter)),
			cache.del(getCachePattern('parameter','byWL_Lang'));
			cache.del(getCachePattern('parameter','byS_WL_LANG'));
			cache.del(getCachePattern('parameter','byK_WL_LANG'));
			return parameter;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
};
