const router = require("express").Router();
const { checkSchema } = require("express-validator");
const FaqRequest = require("../requests/FaqRequest");
const FaqCtrl = require("../controllers/v1/FaqController");

router.get("/", FaqCtrl.get);
router.post("/", checkSchema(FaqRequest.storeValidation), FaqCtrl.store);
router.get('/:id', FaqCtrl.getById); 
router.get('/category/:category', FaqCtrl.getByCategory); 
router.put("/:id", FaqCtrl.edit);
router.delete('/:id', FaqCtrl.destroy);
router.get("/:wl/:lang", FaqCtrl.getByWlAndLang); 
module.exports = router;