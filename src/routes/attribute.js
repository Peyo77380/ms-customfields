const router = require("express").Router();
const { checkSchema } = require("express-validator");
const AttributeController = require("../controllers/v1/AttributeController");
const AttributeRequest = require("../requests/AttributeRequest");

router.get("/:wl/:lang", AttributeController.getByWlAndLang);
router.get("/:id", AttributeController.getById);
router.post("/",checkSchema(AttributeRequest.storeValidation), AttributeController.store);
router.put("/:id", AttributeController.edit);
router.delete('/:id', AttributeController.destroy); 

module.exports = router;
