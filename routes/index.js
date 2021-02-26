const express = require('express');
const router = express.Router();
const { Book } = require('../models');
const { Op } = require('sequelize');

//  res.render('index', { title: 'Express' });

module.exports = router;

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
router.get('/', asyncHandler(async (req, res, next) => {
  res.redirect('/books');
}));

/* GET books page. */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books, title: 'Books' });
}));

/* GET new book. */
router.get('/books/new', (req, res) => {
  res.render('new-book', { book: {}, title: 'New Book' });
});

/* POST new book. */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') { // checking the error
        const errors = error.errors.map(err => err.message)
        res.render('new-book', {errors, book, title: 'New Book' })
    } else {
        throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

/* GET book details by id. */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { book, title: book.title });  
}));

/* POST update book by id. */
router.post('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  try{
    await book.update(req.body);
    res.redirect('/books');
  } catch (error) {
    if(error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.render('update-book', {errors, book, title: book.title});
    } else {
      throw error;
    }
  }
}));

/* POST delete book by id. */
router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/");
}));

module.exports = router;