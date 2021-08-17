const mongoose = require("mongoose");

const uploadFilesSchema = mongoose.Schema(
	{
		length: { type: Number },
		chunkSize: { type: Number },
		uploadDate: { type: Date },
		filename: { type: String },
		md5: { type: String },
		contentType: { type: String }
	},
);

module.exports = mongoose.model("Upload.files", uploadFilesSchema);
