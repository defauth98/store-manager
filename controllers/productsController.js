const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY = 422;

const productsService = require('../services/productsService');

const getAll = rescue(async (_req, res) => {
 const products = await productsService.getAll();

 res.status(HTTP_OK_STATUS).json({ products });
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const { err, product } = await productsService.getById(id);

  if (err) return res.status(UNPROCESSABLE_ENTITY).json({ err });

  res.status(HTTP_OK_STATUS).json(product);
});

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { err, products } = await productsService.create(name, quantity);

  if (err) return res.status(UNPROCESSABLE_ENTITY).json({ err });

  res.status(HTTP_CREATED_STATUS).json(products);
});

module.exports = { getAll, getById, create };
