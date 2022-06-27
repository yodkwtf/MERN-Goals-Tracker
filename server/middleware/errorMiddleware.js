const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  // const message = err.message || 'Something went wrong';
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // some additional info for dev
  });
};

module.exports = { errorHandler };
