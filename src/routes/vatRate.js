const router = require("express").Router();
const { checkSchema } = require("express-validator");
const vatRateController = require("../controllers/v1/VatRateController");
const VatRateRequest = require("../requests/VatRateRequest");

router.get("/:id", vatRateController.getById);
router.get("/all/:wl", vatRateController.getByWl);
router.post("/", checkSchema(VatRateRequest.storeValidation), vatRateController.store);
router.put("/:id", vatRateController.edit);
router.delete('/:id', vatRateController.destroy); 

module.exports = router;
