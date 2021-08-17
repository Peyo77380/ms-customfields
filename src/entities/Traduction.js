const mongoose = require("mongoose");

const tradTableSchema = mongoose.Schema({
	lang: { type: Number, unique: true, required: true },
	text: { type: String, default: "" },
}{
	versionKey: false
});

const TranductionSchema = mongoose.Schema({
	_id: { type: Number },
	key: { type: String, unique: true, required: true },
	trad: { type: [tradTableSchema] },
});

module.exports = mongoose.model("Traduction", TranductionSchema);
