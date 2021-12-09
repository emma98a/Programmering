const express = require('express');
const app = express();

const port = 9000;

// Controllers

const userController = require('./controllers/userController');
const productController = require('./controllers/productController');

app.use(express.static('./views'));
app.use(express.json()); // får fat på en req.body, hvor noget json bliver tilgængeligt

// Routes
app.use('/users', userController);
app.use('/products', productController);

app.listen(port, () => {
  //sker der noget i local host 3000? det lytter den efter
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
