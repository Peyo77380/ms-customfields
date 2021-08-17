const log4js = require("log4js");
const config = require("config");
const logger = log4js.getLogger("ImageController");
logger.level = config.get("log.level");

const ResponseUtils = require("../../utils/ResponseUtil");

const ImageService = require("../../services/ImageService");
const ResponseUtil = require("../../utils/ResponseUtil");
const { connect, mongoose } = require("../../utils/gridFsBucket");

let gfs;
connect.once("open", async () => {
	gfs = await new mongoose.mongo.GridFSBucket(connect.db, {
		// initialize stream
		bucketName: "uploads",
	});
});

module.exports = {
	store: async (req) => {
		let details = JSON.parse(req.body.details);		
		const data = {
			fileId: req.file.id,
			filename: req.file.filename,
			userId: details.user,
			wlId: details.wl,
			caption: details.caption,
			relatedEntityId: details.relatedEntityId,
			relatedEntityType: details.relatedEntityType,
		};
		try {
			const store = await ImageService.store(data);
			ResponseUtil.successCreated(store);
		} catch (err) {
			ResponseUtil.errorsConflict(err);
		}
	},

	getAll: async () => {
		try {
			const images = await ImageService.findAll();
			console.log(images);
			ResponseUtil.success(images);
		} catch (err) {
			ResponseUtil.errorsConflict(err);
		}
	},

	getById: async (req) => {
		try {
			const image = await ImageService.findById(req.params.id);
			ResponseUtils.success(image);
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},

	getByWL: async (req) => {
		try {
			const images = await ImageService.findByWL(req.params.wl);
			ResponseUtils.success(images);
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},

	
	getByRelatedEntityAndWL: async (req, res) => {
		const images = await ImageService.findByRelatedEntityAndWL(req.params.relatedEntityId, req.params.relatedEntityType, req.params.wl);
		filename = images[0].filename;
		console.log("🚀 ~ file: ImageController.js ~ line 72 ~ getByRelatedEntityAndWL: ~ images", filename);
		
		gfs
			.openDownloadStreamByName(filename)
			.pipe(res);



		// const readstream = gfs.createReadStream({ filename: filename });

		// readstream.on('data', (chunk) => {
		// 	data += chunk.toString('base64')
		// })
		// readstream.on('end', () => {
		// 	res.send(data)
		// })
		// try {
		// } catch (error) {
		// 	return ResponseUtils.errorsNotFound();
	},

	destroy: async (req) => {
		try {
			await ImageService.findByWL(req.params.wl);
			ResponseUtils.successNoContent();
		} catch (error) {
			return ResponseUtils.errorsNotFound();
		}
	},

	getFiles: async () => {
		gfs.find({}).toArray((err, files) => {
			if (err) {
				console.log(err);
				return ResponseUtils.errorsNotFound();
			}
			if (!files || files.length === 0) {
				console.log("pas de fichier");
				return ResponseUtils.errorsNotFound();
			}

			files.map((file) => {
				if (
					file.contentType === "image/jpeg" ||
					file.contentType === "image/png" ||
					file.contentType === "image/svg"
				) {
					file.isImage = true;
				} else {
					file.isImage = false;
				}
				return file;
			});
		});
	},

	getFileByFilename: async (req, res, filename) => {
		gfs
            .openDownloadStreamByName(filename)
            .pipe(res);
        //    ResponseUtils.success(files);
	},

	getRelatedFile: async (res, filename) => {
		gfs
            .openDownloadStreamByName(filename)
            .pipe(res);
        //    ResponseUtils.success(files);
	}
};
