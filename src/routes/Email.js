const express = require('express');
const router = express.Router();
const { checkSchema } = require("express-validator");
const EmailRequest = require("../requests/EmailRequest");
const emailCtrl = require('../controllers/v1/EmailController');

router.get('/:wl/:lang', emailCtrl.getByWlAndLang); 
router.get('/:id', emailCtrl.get); 
//router.post('/', checkSchema(EmailRequest.storeValidation), emailCtrl.store);
router.put('/:id', emailCtrl.edit);

module.exports = router;