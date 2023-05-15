module.exports = {
  // Catch 404 for uncatched APIs
  uncatchableAPI: function (req, res, next) {
    next('Not found.');
  },
  // Error handler
  errorHandler: function (er, req, res, next) {
    console.error(er); // For debugging
    res.status(500);
    res.send({ msg: er || 'Unknown error' });
  }
}