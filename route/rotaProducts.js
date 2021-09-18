const express = require('express');
const controller = require('../controller/ctrlProducts');

const rotaProducts = express.Router();

rotaProducts.get('/', controller.getAll);
rotaProducts.post('/', controller.createProduct);

module.exports = rotaProducts;