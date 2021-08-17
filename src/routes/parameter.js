const express = require('express');
const router = express.Router();

const parameterCtrl = require('../controllers/v1/ParameterController');

router.get('/:wl/:lang', parameterCtrl.getParameters); 

/**
 * @swagger
 * /api/parameter:
 *   get:
 *     summary: Returns the list of all the parameter
 *     tags: [Parameters]
 *     responses:
 *       200:
 *         description: The list of the parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parameter'
 */


router.get('/:id', parameterCtrl.getParameterById);
// wl :  white label ID
// lang: language code eg : "FR_fr"
// section : section ID
// eg : http://localhost:3000/api/parameter/1/FR_fr/3
router.get('/:wl/:lang/:section', parameterCtrl.getSection);

// eg :http://localhost:3000/api/parameter/1/FR_fr/key/COWORKING_BOOK_INFO
router.get('/:wl/:lang/key/:key', parameterCtrl.getKey);


router.put('/:id', parameterCtrl.modifyParameter); 

module.exports = router;