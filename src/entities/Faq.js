const mongoose = require("mongoose");

const FaqSchema = mongoose.Schema(
	{
		name: { type: String },
		question: { type: String },
		answer: { type: String },
		wl: { type: Number, default: 0 },
		lang: { type: String, default: "fr_FR" },
		category: {type: mongoose.Types.ObjectId}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Faq", FaqSchema);
