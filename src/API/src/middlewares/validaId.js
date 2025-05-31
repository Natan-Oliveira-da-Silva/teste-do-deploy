export function validaId(campo, origem = 'params') {
  return (req, res, next) => {
    const origemDados = req[origem];
    const valor = origemDados?.[campo];

    if (!valor || isNaN(Number(valor)) || Number(valor) <= 0) {
      return res.status(400).json({ erro: `O campo ${campo} é inválido.` });
    }

    next();
  };
}