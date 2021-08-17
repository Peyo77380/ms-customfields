require("dotenv").config();
const config = require("config");
const express = require("express");
const log4js = require("log4js");
const httpStatus = require("http-status-codes");
const mongoose = require("mongoose");

const appName = require("./package").name;
const appVersion = require("./package").version;

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/api-docs/configuration/swagger");

// log config
const expresslogger = log4js.getLogger(`${appName} v:${appVersion} HTTP`);
const logger = log4js.getLogger(`server`);

expresslogger.level = config.get("log.level");
logger.level = config.get("log.level");
const cors = require("cors");

mongoose
	.connect(process.env.MONGODNS, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		const app = express();
		app.use(cors());
		app.use(log4js.connectLogger(expresslogger, { level: "auto" }));
		app.use(express.json());

		// Push Response to global
		app.use(function (req, res, next) {
			global.ResponseObject = res;
			next();
		});

		app.use("/api/attribute", require("./src/routes/attribute"));
		app.use("/api/list", require("./src/routes/list"));
		app.use("/api/parameter", require("./src/routes/parameter"));
		app.use("/api/email", require("./src/routes/email"));
		app.use("/api/vatRate", require("./src/routes/vatRate"));
		app.use("/api/payment", require("./src/routes/payment"));
		app.use("/api/global", require("./src/routes/global"));
		app.use("/api/image", require("./src/routes/image"));
		app.use("/api/faq", require("./src/routes/faq"));

		// use swagger-Ui-express for your app documentation endpoint
		app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		app.use(function (req, res, next) {
			var err = new Error(`the url ${req.url} does not exists`);
			err.status = httpStatus.StatusCodes.NOT_FOUND;
			next(err);
		});

		/// error handler
		app.use(function (err, req, res, next) {
			res
				.status(err.status || httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
				.json({
					error: err.status ? "Error" + err.status : "Error unknown",
					message: err.message || "No message available",
				})
				.end();
		});

		// Start Express server
		app.listen(config.get("server.port") || 3000, () => {
			console.log("app start");
			logger.debug(`listening on port ${config.get("server.port")}`);
		});
	})
	.catch((err) => {
		logger.warn(err);
	});
