const { ObjectId } = require('mongodb');
const service = require('../service/productsService');

const validateInsertedName = async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await service.getAllProducts();
  if (name.length < 5) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '\'name\' length must be at least 5 characters long',
     } });
  } else if (allProducts.some((product) => product.name === name)) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: 'Product already exists',
    } });
  } else {
    next();
  }
};

const validateInsertedQtd = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '\'quantity\' must be larger than or equal to 1',
    } });
  } else if (typeof quantity !== 'number') {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: '\'quantity\' must be a number',
    } });
  } else {
  next();
  }
};

const validateObjectID = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(422).json({ err: { 
        code: 'invalid_data',
        message: 'Wrong id format',
    } });
  } else {
    next();
  }
};

module.exports = {
    validateInsertedName,
    validateInsertedQtd,
    validateObjectID,
};