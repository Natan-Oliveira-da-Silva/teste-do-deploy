export async function teste(req, res) {
  res.status(200).json({
    mensagem: "Você se conectou com a API.",
  });
}