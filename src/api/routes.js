const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const transactions = require('./components/transactions/transactions-routes');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  transactions(app);

  return app;
};