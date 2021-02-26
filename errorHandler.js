const createError =  require('http-errors');

// catch 404 and forward to error handler
const notFoundErrorHandler = (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "A 404 Error Occured!  The webpage could not be found!";
  next(err);
}

// global error handler
const globalErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
      res.render('page-not-found', {err, title: "404.  Page Not Found"});  
  } else {
      err.status = err.status || 500;
      err.message = `Something went wrong! ${err.message}` || "Something went wrong!";
      console.log(`Error Status: ${err.status}`, `Error Message: ${err.message}`);      
      res.render('error', {err});
      return err;
  }
}

module.exports = {notFoundErrorHandler, globalErrorHandler};