const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const validations = require('../middlewares/validations');

router.post('/',
  validations.validateSoldProductQuantity,
  salesController.create);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

module.exports = router;