module.exports = (err, req, res, next) => {
  console.error('❌ Erro no servidor:', err.stack || err.message);

  res.status(err.status || 500).json({
    message: err.message || 'Erro interno no servidor',
  });
};
