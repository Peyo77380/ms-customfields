const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	check: function (errors) {
		if (!errors.isEmpty()) {
			return ResponseUtils.errorBadRequest(errors.array());
		}
		return true;
	},
	storeValidation: {
		key: {
			notEmpty: true,
		},
		wl: {
			notEmpty: true,
		},
        name: {
			notEmpty: true,
		},
        codeCompta: {
            notEmpty: true,
        }
	},
};