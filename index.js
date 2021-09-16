const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controller/productsController');
const salesController = require('./controller/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.createProduct);

app.get('/products', productsController.getProducts);

app.get('/products/:_id', productsController.getPtoductsById);

app.put('/products/:_id', productsController.editProduct);

app.delete('/products/:_id', productsController.deleteProduct);

app.post('/sales', salesController.createSales);

app.get('/sales', salesController.getSales);

app.get('/sales/:_id', salesController.getIdSales);

app.put('/sales/:_id', salesController.editSale);

app.listen(3000, console.log(`aplicação rodando na porta ${3000}`));
