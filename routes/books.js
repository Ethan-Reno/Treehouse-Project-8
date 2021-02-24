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