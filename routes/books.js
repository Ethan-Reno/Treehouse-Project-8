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

/* POST new book. */
router.post('/', asyncHandler(async (req, res) => {
  let newBook;
  try {
      newBook = await Book.create(req.body);
      res.redirect('/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') { // checking the error
          book = await Book.build(req.body);
          res.render('new-book', { book, errors: error.errors, title: 'New Book' })
      } else {
          throw error; // error caught in the asyncHandler's catch block
      }
  }
}));

/* GET book details by id. */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render('update-book', { book, title: book.title });  
  } else {
    res.sendStatus(404);
  }
}));

/* POST update book by id. */
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.update(req.body);
    res.redirect("/"); 
  }
}));

/* POST delete book by id. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;