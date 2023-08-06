class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.message = "DATABASE_ERROR";
    this.statusCode = 400;
  }
}

class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

const catchError = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message });
};

module.exports = { DatabaseError, catchError, globalErrorHandler, BaseError };
