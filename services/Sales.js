const Sales = require('../models/Sales');

const registerSale = async (products) => {
  const sale = await Sales.registerSale(products);

  return sale;
};

const getAll = async () => {
  const sales = await Sales.getAll();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await Sales.getSaleById(id);

  return sale;
};

const editSale = async (id, products) => {
  const sale = await Sales.editSale(id, products);

  return sale;
};

module.exports = { registerSale, getAll, getSaleById, editSale };
