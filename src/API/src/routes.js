import { Router } from "express";
import { validaId } from "./middlewares/validaId.js";
import { validaDescricao } from "./middlewares/validaDescricao.js";
import {
  teste,
  marcaTarefaComoConcluida,
pegaTodasAsTarefasDeUmFuncionario,
pegaAsTarefasPendentesDeUmFuncionario,
pegaAsTarefasConcluidasDeUmFuncionario,
  criaTarefa,
  associaTarefaAUmFuncionario,
  pegaTodasAsTarefasCriadasPorUmSupervisor,
  pegaTodasAsTarefas,
pegaTodasAsTarefasPendentes,
pegaTodosOsFuncionariosDisponiveis
} from "./Controllers/Tarefa.js";

const router = Router();

// Rota de teste de conexão
router.get("/teste", teste);

// // Rotas do cliente FUNCIONÁRIO
router.get(
  "/funcionario/:id_funcionario",
  validaId("id_funcionario"),
  pegaAsTarefasPendentesDeUmFuncionario
);
router.patch(
  "/funcionario/:id_tarefa",
  validaId("id_tarefa"),
  marcaTarefaComoConcluida
);

// // Rotas do cliente SUPERVISOR
router.get('/supervisor/todas/:id_funcionario',validaId('id_funcionario'),pegaTodasAsTarefasDeUmFuncionario)
router.get('/supervisor/pendentes/:id_funcionario',validaId('id_funcionario'),pegaAsTarefasPendentesDeUmFuncionario)
router.get('/supervisor/concluidas/:id_funcionario',validaId('id_funcionario'),pegaAsTarefasConcluidasDeUmFuncionario)
router.post(
  "/supervisor",
  validaId("id_supervisor", "body"),
  validaDescricao,
  criaTarefa
);
router.patch(
  "/supervisor/:id_funcionario/:id_tarefa",
  validaId("id_funcionario"),
  validaId("id_tarefa"),
  associaTarefaAUmFuncionario
);

// // Rotas do cliente GERENTE
router.get("/gerente/todas", pegaTodasAsTarefas);
router.get('/gerente/pendentes',pegaTodasAsTarefasPendentes)
router.get('/gerente/funcionariosdisponiveis',pegaTodosOsFuncionariosDisponiveis)
router.get('/gerente/:id_supervisor',validaId('id_supervisor'),pegaTodasAsTarefasCriadasPorUmSupervisor)

export default router;