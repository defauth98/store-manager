const productsModel = require('../models/Products');

const create = async (name, quantity) => {
  const exists = await productsModel.getByName(name);

  if (exists) return;

  const product = await productsModel.create(name, quantity);

  return product;
};

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
};