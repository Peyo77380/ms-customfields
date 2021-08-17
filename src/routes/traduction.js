const express = require('express');
const router = express.Router();

const traductionCtrl = require('../controllers/v1/TraductionController');

router.get('/', traductionCtrl.getTraduction); 
router.get('/:id', traductionCtrl.getTraductionById); 
router.post('/', traductionCtrl.createTraduction);
router.put('/:id', traductionCtrl.modifyTraduction);

module.exports = router;