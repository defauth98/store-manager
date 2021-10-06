const productService = require('../service/productsService');
const salesModel = require('../model/salesModel');

const updateWhenSaleMaded = async (id, q) => {
  const result = await productService.getById(id);
  const product = result.pop();
  const { _id, name, quantity } = product;
  const operation = await productService.updateProduct(_id, { name, quantity: quantity - q });
  console.log(operation);
  // return operation;
  // const newQ = quantity - q;
  // const operation = await productService.updateProduct(productId, { name, quantity: newQ });
  // return operation;
};

const restoreWhenSaleDeleted = async (id) => {
  const result = await salesModel.getSalesById(id);
  const sale = result.pop();
  const { itensSold } = sale;
  await itensSold.forEach(async ({ productId, quantity }) => {
    const res = await productService.getById(productId);
    const product = res.pop();
    const { _id, name, quantity: q } = product;
    const restoredQ = q + quantity;
    const operation = await productService.updateProduct(_id, { name, quantity: restoredQ });
    return operation;
  });
};

module.exports = {
    updateWhenSaleMaded,
    restoreWhenSaleDeleted,
};