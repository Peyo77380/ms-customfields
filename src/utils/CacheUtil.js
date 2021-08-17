// cache
const redis = require("redis");
const config = require("config");

const cache = redis.createClient({
	host: config.get("cache.hostname"),
	port: config.get("cache.port"),
});
cache.on("connect", () => {
	console.log("redis connected");
});
cache.on("error", (error) => {
	console.log(error);
});

const getCache = (cat, name, id = null) => {
	try {
		const cacheKeys = config.get("cache");
		return id ? cacheKeys[cat][name] + id : cacheKeys[cat][name];
	} catch (e) {
		//TODO : add error
	}
};

const getCachePattern = (cat, name, key = null) => {
	try {
		const cacheKeys = config.get("cache");
		return `${cacheKeys[cat][name]}${key}`;
	} catch (e) {
		//TODO : add error
	}
};

const getCacheOrFetch = (cat, name, criteria = null, fetchFunction) => {
	return new Promise((resolve, reject) => {
		cache.get(getCache(cat, name, criteria), async (error, data) => {
			if (error) {
				return reject(error);
			}
			if (data != null) {
				data = JSON.parse(data);
				data.cached = true;
				return resolve(data);
			}
			const fetchedData = await fetchFunction;
			cache.set(getCache(cat, name, criteria), JSON.stringify(fetchedData));
			return resolve(fetchedData);
		});
	});
};

module.exports = { cache, getCache, getCachePattern, getCacheOrFetch };
