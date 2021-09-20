const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productController = require('./controllers/productControllers');
const salesController = require('./controllers/salesControllers');

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/products', productController.create);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.create);

app.listen(PORT, () => {
  console.log('Tá funcionando!');
});