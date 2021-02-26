// catch 404 and forward to error handler
const notFoundErrorHandler = (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "404 Error: The webpage could not be found!";
  next(err);
}

// global error handler
const globalErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
      res.status(404).render('page-not-found', {err, title: "404. Page Not Found"});  
  } else {
      err.message = `${err.message}` || "Something went wrong!";    
      res.status(err.status || 500).render('error', {err});
      return err;
  }
}

module.exports = {notFoundErrorHandler, globalErrorHandler};