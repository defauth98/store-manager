// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const Product = require('./controllers/Product');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Product.getAllProducts);

app.get('/products/:id', Product.findById);

app.post('/products', Product.create);

app.put('/products/:id', Product.updateProduct);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});