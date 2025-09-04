module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    error: err.message || 'Internal Server Error',
  };
  if (process.env.NODE_ENV === 'test') {
    // helpful in tests
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
};
