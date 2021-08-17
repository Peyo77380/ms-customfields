const router = require("express").Router();

const GlobalCtrl = require("../controllers/v1/GlobalController");

router.get("/", GlobalCtrl.get);

module.exports = router;
