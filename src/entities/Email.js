const mongoose = require("mongoose");


const valueSchema = mongoose.Schema({
		value: { type: String},
	});


const emailSchema = mongoose.Schema(
	{
		section: { type: Number }, // 1 => membre / 2 => factu*
		wl: { type: Number, default: 0 },
		lang: { type: String },
		key: { type: String }, // MAIL_REGISTRATION
		info: { type: mongoose.Types.ObjectId, ref: "Traduction" },
		title : { type: String },
		description: { type: String },
		content: { type: String },
		emailCopy: { type: [valueSchema] },
		hiddenCopy: { type: [valueSchema] },
		variable: { type: [valueSchema] }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Email", emailSchema);
