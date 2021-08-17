const swaggerJSDoc = require("swagger-jsdoc");
const config = require("config");

const swaggerDefinition = {
	info: {
		title: "REST API for my App", // Title of the documentation
		version: "1.0.0", // Version of the app
		description: "This is the REST API for Customfields", // short description of the app
	},
	host: `localhost:${config.get("server.port")}`, // the host or url of the app
	basePath: "/api", // the basepath of your endpoint
};

// options for the swagger docs
const options = {
	// import swaggerDefinitions
	swaggerDefinition,
	// path to the API docs
	apis: [
		"src/api-docs/attribute.yaml",
		"src/api-docs/parameter.yaml",
		"src/api-docs/list.yaml",
		"src/api-docs/payment.yaml",
		"src/api-docs/vatRate.yaml",
		"src/api-docs/email.yaml",
		"src/api-docs/global.yaml",
	],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
