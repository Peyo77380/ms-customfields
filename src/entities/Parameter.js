const mongoose = require("mongoose");

const parameterSchema = mongoose.Schema(
	{
		//_id: { type: Number },
		section: { type: Number }, // 1 => modes de règlement / 2 => membres / 3 => édition de contenu / 4 => salles de réunion / 5 => régalges
		key: { type: String }, // FREETIME
		wl: { type: Number, default: 0 },
		lang: { type: String },
		typeValue: {
			type: Number,
			enum: [1, 2],
			default: 2,
		}, // 1 => string, 2 => number
		info: { type: String }, //{type: mongoose.Types.ObjectId, ref:'Traduction' },
	},
	{
		discriminatorKey: "typeValue",
		timestamps: true,
	}
);

const Parameter = mongoose.model("Parameter", parameterSchema);

Parameter.discriminator(
	1,
	new mongoose.Schema({
		value: {
			type: String,
			default: "",
		},
	})
);

Parameter.discriminator(
	2,
	new mongoose.Schema({
		value: {
			type: Number,
			default: 0,
		},
	})
);

module.exports = mongoose.model("Parameter", parameterSchema);
