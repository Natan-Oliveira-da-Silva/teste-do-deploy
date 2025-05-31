function tratadorDeErros(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
}

export default tratadorDeErros