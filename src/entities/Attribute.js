const mongoose = require("mongoose");

const attributeSchema = mongoose.Schema(
	{
		key: { type: String }, // identifiant
		name: { type: String },
		wl: { type: Number, default: 0 },
		lang: { type: String },
		typeData: {
			type: String,
			enum: ["Champs texte", "Un seul choix", "Liste de sélection"],
			default: "Champ libre",
		},
	},
	{ discriminatorKey: "typeData", timestamps: true }
);
const Attribute = mongoose.model("Attribute", attributeSchema);

Attribute.discriminator(
	"Champs texte",
	new mongoose.Schema({
		unity: {
			type: String,
			default: "",
		},
	})
);

Attribute.discriminator(
	"Un seul choix",
	new mongoose.Schema({
		datas: {
			type: Array,
		},
	})
);

Attribute.discriminator(
	"Liste de sélection",
	new mongoose.Schema({
		datas: {
			type: Array,
		},
	})
);

module.exports = mongoose.model("Attribute", attributeSchema);
