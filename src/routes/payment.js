const router = require("express").Router();
const { checkSchema } = require("express-validator");
const paymentController = require("../controllers/v1/paymentController");
const PaymentRequest = require("../requests/PaymentRequest");

//router.get("/", paymentController.index);
router.get("/all/:wl", paymentController.getByWl);
router.get("/:id", paymentController.getById);
router.post("/", checkSchema(PaymentRequest.storeValidation), paymentController.store);
router.put("/:id", paymentController.edit);
router.delete('/:id', paymentController.destroy); 

module.exports = router;