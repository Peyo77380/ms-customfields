const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
	{
		filename: { type: String },
		fileId: { type: mongoose.Types.ObjectId, ref: "Uploads.files" },
        wlId: { type: Number, default: 0 },
		userId: { type: String },
		caption: { type: String},
		relatedEntityId: { type: String },
		relatedEntityType: { type: Number }
	},
);

module.exports = mongoose.model("Image", imageSchema);
