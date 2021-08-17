const router = require("express").Router();
const ImageController = require("../controllers/v1/ImageController");
const {upload } = require('../utils/StorageUtil')


router.get("/files", ImageController.getFiles);
router.get("/:wl/:relatedEntityType/:relatedEntityId", ImageController.getByRelatedEntityAndWL);
router.get("/files/:filename", ImageController.getFileByFilename);
router.get("/wl/:wl", ImageController.getByWL);
router.get("/:id", ImageController.getById);
router.get("/", ImageController.getAll);
router.post("/", upload.single('file'), ImageController.store);
//router.delete("/:id", ImageController.delete);

module.exports = router;
