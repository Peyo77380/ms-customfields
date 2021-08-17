const { response, json } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

module.exports = {
	success: function (datas) {
		global.ResponseObject.status(StatusCodes.OK);
		let cache = false;
		if(datas.cached) {
			cache = true;
			delete datas.cached;
		}

		global.ResponseObject.send({
			status: StatusCodes.OK,
			time: Date.now(),
			cache,
			datas,
		});
	},
	successNoContent: function () {
		global.ResponseObject.status(StatusCodes.NO_CONTENT);
		global.ResponseObject.send();
	},

	successCreated: function (datas) {
		global.ResponseObject.status(StatusCodes.CREATED);
		global.ResponseObject.send({
			status: StatusCodes.CREATED,
			message: ReasonPhrases.CREATED,
			time: Date.now(),
			datas,
		});
	},
	successEdited: function (id, requestData = null, ObjectData = null) {
		global.ResponseObject.status(StatusCodes.OK);
		global.ResponseObject.send({
			status: StatusCodes.OK,
			message: `Successfull modification of ObjectData ${id}`,
			time: Date.now(),
			datas: {
				requestData,
				ObjectData,
			},
		});
	},
	errorsConflict: function (errors) {
		global.ResponseObject.status(StatusCodes.CONFLICT);
		global.ResponseObject.send({
			status: StatusCodes.CONFLICT,
			message: ReasonPhrases.CONFLICT,
			time: Date.now(),
			errors,
		});
	},
	errorsNotFound: function () {
		global.ResponseObject.status(StatusCodes.NOT_FOUND);
		global.ResponseObject.send({
			status: ReasonPhrases.NOT_FOUND,
			message: ReasonPhrases.NOT_FOUND,
			time: Date.now(),
		});
	},
	errorBadRequest: function (message) {
		global.ResponseObject.status(StatusCodes.BAD_REQUEST);
		global.ResponseObject.send({
			status: ReasonPhrases.BAD_REQUEST,
			message,
			time: Date.now(),
		});
	},
};
