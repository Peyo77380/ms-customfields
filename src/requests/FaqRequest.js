const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	check: function (errors) {
		if (!errors.isEmpty()) {
			return ResponseUtils.errorBadRequest(errors.array());
		}
		return true;
	},
	storeValidation: {
		question: {
			notEmpty: true,
		},
		answer: {
			notEmpty: true,
		},
		name: {
			notEmpty: true,
		},
		lang: {
			notEmpty: true,
		},
		wl: {
			notEmpty: true,
		},
	},
};