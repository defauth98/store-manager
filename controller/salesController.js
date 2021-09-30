const salesService = require('../service/salesService');
const constants = require('../constants');

module.exports.createSales = async (req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.createSales(req.body);
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 422;
    delete response.body;
  }
  return res.status(response.status).send(response.body);
};

module.exports.getAllSales = async (_req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.getAllSales();
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 422;
    delete response.body;
  }
  return res.status(response.status).send(response.body);
};

module.exports.getsalesById = async (req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.getsalesById(req.params);
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 404;
    response.body = { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return res.status(response.status).send(response.body);
};
