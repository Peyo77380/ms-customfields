const mongoose = require("mongoose");

const globalSchema = mongoose.Schema(
	{
		id: { type: Number },
		value: { type: String },
		lang: { type: String },
		class: { type: String },
		initial: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Global", globalSchema);
