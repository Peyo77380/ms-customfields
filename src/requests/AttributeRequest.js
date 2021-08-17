const ResponseUtils = require("../utils/ResponseUtil");
const { body, oneOf } = require('express-validator');
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
        name: {
			notEmpty: true,
		},
		wl: {
			notEmpty: true,
		},
        lang: {
			notEmpty: true,
		},
        typeData: {
            notEmpty: true,
        }
	}
};
