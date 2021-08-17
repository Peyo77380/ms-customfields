const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	check: function (errors) {
		if (!errors.isEmpty()) {
			return ResponseUtils.errorBadRequest(errors.array());
		}
		return true;
	},
	storeValidation: {
		rate: {
			notEmpty: true,
		},
		codeCompta: {
			notEmpty: true,
		},
		wl: {
			notEmpty: true,
		}
	},
};
