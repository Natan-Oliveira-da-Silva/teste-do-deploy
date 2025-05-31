export function validaDescricao(req, res, next) {
  const { descricao } = req.body;

  if (
    descricao === undefined ||
    descricao === null ||
    typeof descricao !== 'string' ||
    descricao.trim().length === 0
  ) {
    return res.status(400).json({ erro: 'A descrição é obrigatória e deve ser uma string não vazia.' });
  }

  next();
}