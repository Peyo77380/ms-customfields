const mongoose = require("mongoose");

const listDatasSchema = mongoose.Schema(
	{
		//	value: { type: Number, required: true },
		text: { type: String, default: "" },
	},
	{ versionKey: false }
);

const listSchema = mongoose.Schema(
	{
		section: { type: Number }, // 1 => membre / 2 => facturation
		key: { type: String }, // categories  // Secteur d'activité / job , unique: true
		wl: { type: Number, default: 0 },
		lang: { type: String },
		info: { type: mongoose.Types.ObjectId, ref: "Traduction" },
		datas: { type: [listDatasSchema] },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("List", listSchema);
