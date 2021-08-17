const router = require("express").Router();

const listCtrl = require("../controllers/v1/ListController");

router.post("/data/:id", listCtrl.addData);
//Edit list data
router.put("/data/:id", listCtrl.editData);
//Delete list data
router.put("/data/rm/:id", listCtrl.removeData);
/*router.delete('/:id', listCtrl.deleteList); */

//Get lists by wl and language
router.get("/key/:wl/:lang/:key", listCtrl.getByWlAndLangAndKey);
router.get("/:wl/:lang", listCtrl.getByWlAndLang);

router.get("/:id", listCtrl.get);

module.exports = router;
