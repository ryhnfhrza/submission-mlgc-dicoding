const errorHandler = (err, req, res, next) => {
  const status = err.status || 400;


  if (status === 413) {
    return res.status(413).json({
      status: 'fail',
      message: err.message || 'Payload content length greater than maximum allowed',
    });
  }

  res.status(status).json({
    status: 'fail',
    message: err.message || 'Terjadi kesalahan dalam melakukan prediksi',
  });
};

module.exports = { errorHandler };
