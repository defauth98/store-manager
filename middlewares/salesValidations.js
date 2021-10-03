const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const INVALID_DATA_ERROR_MESSAGE = 'Wrong product ID or invalid quantity';
const INVALID_ID_FORMAT_ERROR_MESSAGE = 'Wrong sale ID format';
const NOT_ALLOWED_AMOUNT_ERROR_MESSAGE = 'Such amount is not permitted to sell';

function quantityValidation(req, _res, next) {
  const sales = [...req.body];

  sales.forEach(async (sale) => {
    if (sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      next({ status: 422, code: 'invalid_data', message: INVALID_DATA_ERROR_MESSAGE });
    }

    const product = await Products.getProductById(ObjectId(sale.productId));
    if (sale.quantity > product.quantity) {
      next({ status: 404, code: 'stock_problem', message: NOT_ALLOWED_AMOUNT_ERROR_MESSAGE });
    }
  });

  next();
}

function idValidation(req, _res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    next({ status: 422, code: 'invalid_data', message: INVALID_ID_FORMAT_ERROR_MESSAGE });
  }

  next();
}

module.exports = {
  quantityValidation,
  idValidation,
};
