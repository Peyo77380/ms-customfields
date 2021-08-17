const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ListService");
logger.level = config.get("log.level");
var ObjectID = require("mongodb").ObjectID;

const List = require("../entities/List");
const ResponseUtils = require("../utils/ResponseUtil");
const {
	getCacheOrFetch,
	cache,
	getCache,
	getCachePattern,
} = require("../utils/CacheUtil");

module.exports = {
	findOne: async function (id) {
		const fetchFunction = async (id) => {
			return await List.findById(id);
		};
		return getCacheOrFetch("list", "get", id, fetchFunction(id));
	},
	findByWlAndLangAndKey: async function (params) {
		const fetchFunction = async (params) => {
			return await List.find({
				wl: params.wl,
				lang: params.lang,
				key: params.key
			})}
	
			return getCacheOrFetch(
				"list",
				"byWL_Lang_Key",
				`${params.wl}_${params.lang}_${params.key}`,
				fetchFunction(params)
			);
	},
	findByWlAndLang: async function (params) {
		const fetchFunction = async (params) => {
			return await List.find({
				wl: params.wl,
				lang: params.lang,
			})};
		return getCacheOrFetch(
			"list",
			"byWL_Lang",
			`${params.wl}_${params.lang}`,
			fetchFunction(params)
		);
	},
	addListData: async function (id, data) {
		try {
			const list = await List.findByIdAndUpdate(
				{ _id: ObjectID(id) },
				{ $push: { datas: data } },
				{ new: true }
			);
			cache.set(getCache("list", "get", id), JSON.stringify(list));
			cache.del(getCachePattern("list", "byWL_Lang"));
			return list;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
	editListData: async function (id, data) {
		try {
			const list = await List.findOneAndUpdate(
				{
					_id: ObjectID(id),
					"datas._id": ObjectID(data._id),
				},
				{ $set: { "datas.$.text": data.text } },
				{ new: true }
			);
			cache.set(getCache("list", "get", id), JSON.stringify(list));
			cache.del(getCachePattern("list", "byWL_Lang"));
			return list;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
	removeListData: async function (id, data) {
		try {
			const list = await List.findByIdAndUpdate(
				{ _id: ObjectID(id) },
				{ $pull: { datas: { _id: ObjectID(data._id) } } },
				{ new: true }
			);
			cache.set(getCache("list", "get", id), JSON.stringify(list));
			cache.del(getCachePattern("list", "byWL_Lang"));
			return list;
		} catch (error) {
			logger.debug(error);
			ResponseUtils.errorsNotFound();
		}
	},
};
