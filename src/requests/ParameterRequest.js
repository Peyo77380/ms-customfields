const ResponseUtils = require("../utils/ResponseUtil");

module.exports = {
	check: function (errors) {
		if (!errors.isEmpty()) {
			return ResponseUtils.errorBadRequest(errors.array());
		}
		return true;
	},
	storeValidation: {
        name: {
            notEmpty: true,
        },
		section: {
			notEmpty: true,
		},
		key: {
			notEmpty: true,
		}
	},
};
