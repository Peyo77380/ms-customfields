const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const dotenv = require("dotenv");
const path = require('path');


const url = dotenv.config().parsed.MONGODNS;

const storage = new GridFsStorage({
	url,
	file: (req, file) => {
		console.log(req);
		return new Promise ( (resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) return reject(err);
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileinfo = {
					filename,
					bucketName: 'uploads'
				};
				resolve(fileinfo);
			})
		})
	}
});
const upload = multer({ storage });

module.exports = {
	upload
}