const fs = require('fs');

const DATA_PATH = __dirname + '/database';
const USER_FILE = '/username.json';
const PRODUCT_FILE = '/product.json';

class Database {
  constructor() {
    this.users = this.readFile(USER_FILE);
    this.products = this.readFile(PRODUCT_FILE);
  }

  /* Read and write */
  readFile(file) {
    const data = fs.readFileSync(DATA_PATH + file);
    return JSON.parse(data);
  }

  writeFile(file, content) {
    fs.writeFileSync(DATA_PATH + file, content);
  }

  /* USER DB */
  findUser(user) {
    return this.users.find((obj) => obj.email == user.email); 
  }

  createUser(user) {
    this.users.push(user);
    this.writeFile(USER_FILE, JSON.stringify(this.users));
  }

  /* PRODUCT DB */
  findProduct(product) {
    return this.products.find((obj) => obj.id == product.id);
  }

  createProduct(product) {
    this.products.push(product);
    this.writeFile(PRODUCT_FILE, JSON.stringify(this.products));
  }
/*
  updateProduct(product) {
    this.products.push(product);
    this.writeFile(USER_FILE, JSON.stringify(this.products));
  }

  deleteProduct(product) {
    this.products.splice(product);
    this.writeFile(USER_FILE, JSON.stringify(this.products));
  }*/
}

module.exports = new Database();
