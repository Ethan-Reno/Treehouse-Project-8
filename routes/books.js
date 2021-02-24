var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb) {
  return async (req, res, next) => {
      try {
          await cb(req, res, next)
      } catch (error) {
          next(error);
      }
  }
}

//500 error test for step 7
router.get('/error', (req, res, next) => {
  const error = new Error();
  error.status = 500;
  error.message = 'Test error';
  throw error;
});

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books, title: 'Books' });
}));

/* GET new book. */
router.get('/new', asyncHandler(async (req, res) => {
  res.render('new-book', { book: {}, title: 'New Book' });
}));

module.exports = router;