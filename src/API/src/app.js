import express from "express";
import {rotaNaoEncontrada} from "./middlewares/rotaNaoEncontrada.js";
import { criaEPopulaTabelas } from "./database/Migrations/criaEPopulaTabelas.js";
import tratadorDeErros from "./middlewares/tratadorDeErros.js";
import router from "./routes.js";
const PORT = 3000;
const app = express();
app.use(express.json());

app.use(router);
criaEPopulaTabelas();
// Middleware para rota não encontrada
app.use(rotaNaoEncontrada);

// Middleware para tratamento de erros
app.use(tratadorDeErros);

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}.`));