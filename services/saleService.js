const Sale = require('../models/Sale');

const validateSaleQuantity = (salesArr) =>
  salesArr.every((sale) => typeof sale.quantity === 'number')
  && salesArr.every((sale) => sale.quantity >= 1);

exports.create = async (salesArr) => {
  if (!validateSaleQuantity(salesArr)) {
    return {
      message: 'Wrong product ID or invalid quantity',
      code: 'invalid_data',
    };
  }
  const sale = await Sale.createSale(salesArr);

  return { sale };
};

exports.getAll = async () => {
  const sales = Sale.getAll();

  return sales;
};

exports.getById = async (id) => {
  const sale = await Sale.getById(id);

  if (!sale) {
    return { message: 'Sale not found', code: 'not_found' }; 
  }

  return { sale };
};

exports.update = async (id, productId, newQuantity) => {
  if (!validateSaleQuantity([{ productId, quantity: newQuantity }])) {
    return {
      message: 'Wrong product ID or invalid quantity',
      code: 'invalid_data',
    };
  }

  const sale = await Sale.updateSale(id, productId, newQuantity);

  if (sale === null) {
    return { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' }; 
  }

  return { sale };
};

exports.delete = async (id) => {
  const deletedSale = await Sale.deleteSale(id);

  if (!deletedSale) {
    return { message: 'Wrong sale ID format', code: 'invalid_data' }; 
  }

  return deletedSale;
};
