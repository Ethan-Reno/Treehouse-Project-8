const createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const { sequelize } = require('./models');
const errorHandler = require('./errorHandler');

const app = express();

(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to database successful.');
  } catch (error) {
    console.error('Connection to database failed: ', error);
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.globalErrorHandler);

module.exports = app;