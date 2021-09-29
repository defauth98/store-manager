const modelProduct = require('../models/products');

const validName = (name) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};

const nameDuplicate = async (name) => {
  const productsAll = await modelProduct.getAll();
  const findProduct = productsAll.find((product) => product.name === name);
  if (findProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
};

const notQuantityNegative = (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const notNumberQuantity = (quantity) => {
  if (typeof (quantity) !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

module.exports = {
  validName,
  nameDuplicate,
  notQuantityNegative,
  notNumberQuantity,
};