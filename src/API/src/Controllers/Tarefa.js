import { openDb } from "../configDB.js";

export async function teste(req, res) {
  res.status(200).json({
    mensagem: "Você se conectou com a API.",
  });
}


export async function pegaTodasAsTarefas(req, res, next) {
  try {
    const db = await openDb();

    const tarefas = await db.all(`
      SELECT 
        t.*,
        f.nome AS nome_funcionario,
        s.nome AS nome_supervisor
      FROM tarefas t
      LEFT JOIN clientes f ON t.id_funcionário = f.id
      LEFT JOIN clientes s ON t.id_supervisor = s.id
    `);

    res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
}

export async function pegaTodasAsTarefasPendentes(req, res, next) { 
  try {
    const db = await openDb();

    const tarefas = await db.all(`
      SELECT 
        t.*,
        f.nome AS nome_funcionario,
        s.nome AS nome_supervisor
      FROM tarefas t
      LEFT JOIN clientes f ON t.id_funcionário = f.id
      LEFT JOIN clientes s ON t.id_supervisor = s.id
      WHERE t.estaConcluida = 0
    `);

    res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
}


export async function pegaAsTarefasPendentesDeUmFuncionario(req, res, next) {
  try {
    const id_funcionario = req.params.id_funcionario;
    const db = await openDb();

    const funcionario = await db.get(
      "SELECT id, cargo FROM clientes WHERE id = ?",
      id_funcionario
    );

    if (!funcionario) {
      return res.status(404).json({
        erro: `Cliente com ID ${id_funcionario} não encontrado.`,
      });
    }

    if (funcionario.cargo !== "funcionário") {
      return res.status(400).json({
        erro: `O cliente com ID ${id_funcionario} não possui o cargo de funcionário.`,
      });
    }

    const tarefas = await db.all(`
      SELECT 
        t.*,
        f.nome AS nome_funcionario,
        s.nome AS nome_supervisor
      FROM tarefas t
      LEFT JOIN clientes f ON t.id_funcionário = f.id
      LEFT JOIN clientes s ON t.id_supervisor = s.id
      WHERE t.id_funcionário = ? AND t.estaConcluida = 0
    `, id_funcionario);

    res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
}
export async function pegaAsTarefasConcluidasDeUmFuncionario(req, res, next) {
  try {
    const id_funcionario = req.params.id_funcionario;
    const db = await openDb();

    const funcionario = await db.get(
      "SELECT id, cargo FROM clientes WHERE id = ?",
      id_funcionario
    );

    if (!funcionario) {
      return res.status(404).json({
        erro: `Cliente com ID ${id_funcionario} não encontrado.`,
      });
    }

    if (funcionario.cargo !== "funcionário") {
      return res.status(400).json({
        erro: `O cliente com ID ${id_funcionario} não possui o cargo de funcionário.`,
      });
    }

    const tarefas = await db.all(`
      SELECT 
        t.*,
        f.nome AS nome_funcionario,
        s.nome AS nome_supervisor
      FROM tarefas t
      LEFT JOIN clientes f ON t.id_funcionário = f.id
      LEFT JOIN clientes s ON t.id_supervisor = s.id
      WHERE t.id_funcionário = ? AND t.estaConcluida = 1
    `, id_funcionario);

    res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
}

export async function pegaTodasAsTarefasDeUmFuncionario(req, res, next) {
  try {
    const id_funcionario = req.params.id_funcionario;
    const db = await openDb();

    const funcionario = await db.get(
      "SELECT id, cargo FROM clientes WHERE id = ?",
      id_funcionario
    );

    if (!funcionario) {
      return res.status(404).json({
        erro: `Cliente com ID ${id_funcionario} não encontrado.`,
      });
    }

    if (funcionario.cargo !== "funcionário") {
      return res.status(400).json({
        erro: `O cliente com ID ${id_funcionario} não possui o cargo de funcionário.`,
      });
    }

    const tarefas = await db.all(`
      SELECT 
        t.*,
        f.nome AS nome_funcionario,
        s.nome AS nome_supervisor
      FROM tarefas t
      LEFT JOIN clientes f ON t.id_funcionário = f.id
      LEFT JOIN clientes s ON t.id_supervisor = s.id
      WHERE t.id_funcionário = ?
    `, id_funcionario);

    res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
}
export async function pegaTodasAsTarefasCriadasPorUmSupervisor(req, res, next) {
  try {
    const id_supervisor = req.params.id_supervisor;
    const db = await openDb();

    const supervisor = await db.get(
      "SELECT id, cargo FROM clientes WHERE id = ?",
      id_supervisor
    );

    if (!supervisor) {
      return res.status(404).json({
        erro: `Cliente com ID ${id_supervisor} não encontrado.`,
      });
    }

    if (supervisor.cargo !== "supervisor") {
      return res.status(400).json({
        erro: `O cliente com ID ${id_supervisor} não possui o cargo de supervisor.`,
      });
    }

    const tarefas = await db.all(`
      SELECT 
        t.*,
        f.nome AS nome_funcionario,
        s.nome AS nome_supervisor
      FROM tarefas t
      LEFT JOIN clientes f ON t.id_funcionário = f.id
      LEFT JOIN clientes s ON t.id_supervisor = s.id
      WHERE t.id_supervisor = ?
    `, id_supervisor);

    res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
}
export async function pegaTodosOsFuncionariosDisponiveis(req, res, next) {
  try {
    const db = await openDb();

    const funcionarios = await db.all(`
      SELECT c.id, c.nome
      FROM clientes c
      LEFT JOIN tarefas t 
        ON c.id = t.id_funcionário AND t.estaConcluida = 0
      WHERE c.cargo = 'funcionário' AND t.id IS NULL
    `);

    res.status(200).json(funcionarios);
  } catch (error) {
    next(error);
  }
}
export async function criaTarefa(req, res, next) {
  const { id_supervisor, descricao } = req.body; // Inclui id_funcionário se for usar
  // 1. Validação de campos obrigatórios iniciais (opcional, mas boa prática)

  try {
    const db = await openDb();
    // 2. Checar se o id_supervisor consta na tabela clientes
    const supervisorCliente = await db.get(
      "SELECT id, cargo FROM clientes WHERE id = ?",
      id_supervisor
    );

    if (!supervisorCliente) {
      // Se não encontrar o cliente com o id_supervisor
      return res
        .status(404)
        .json({ erro: `Cliente com ID ${id_supervisor} não encontrado.` });
    }

    // 3. Se encontrar, checar se o registro tem o cargo supervisor
    if (supervisorCliente.cargo !== "supervisor") {
      // Se o cliente existe, mas não é supervisor
      return res
        .status(400)
        .json({
          erro: `O cliente com ID ${id_supervisor} não possui o cargo de supervisor.`,
        });
    }
    // 5. Se todas as validações passarem, inserir a tarefa no banco de dados
    const result = await db.run(
      `INSERT INTO tarefas (id_supervisor, descricao) VALUES (?,?)`,
      [id_supervisor, descricao] // 0 para estaConcluida = FALSE
    );

    res.status(201).json({
      statusCode: 201,
      message: "Tarefa criada com sucesso!",
      tarefaId: result.lastID,
    });
  } catch (error) {
    // Se ocorrer um erro inesperado (ex: problema de conexão com o DB),
    // o middleware de tratamento de erros será chamado.
    next(error);
  }
}

export async function marcaTarefaComoConcluida(req, res, next) {
  try {
    const id_tarefa = req.params.id_tarefa; // vindo da rota (param), não do body
    const db = await openDb();

    // Verifica se a tarefa existe
    const tarefa = await db.get(
      "SELECT * FROM tarefas WHERE id = ?",
      id_tarefa
    );
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    // Verifica se a tarefa foi atribuída a um funcionário
    if (tarefa.id_funcionário === null) {
      return res
        .status(400)
        .json({
          erro: "Não é possível concluir uma tarefa não atribuída a um funcionário.",
        });
    }

    // Atualiza a tarefa como concluída
    await db.run(
      "UPDATE tarefas SET estaConcluida = 1 WHERE id = ?",
      id_tarefa
    );

    res.status(200).json({ mensagem: "Tarefa marcada como concluída." });
  } catch (error) {
    next(error); // Encaminha para o tratador de erros
  }
}

export async function associaTarefaAUmFuncionario(req, res, next) {
  try {
    const id_funcionario = req.params.id_funcionario;
    const id_tarefa = req.params.id_tarefa;

    const db = await openDb();

    // Verifica se o cliente existe
    const funcionario = await db.get(
      "SELECT id, cargo FROM clientes WHERE id = ?",
      id_funcionario
    );
    if (!funcionario) {
      return res
        .status(404)
        .json({ erro: `Cliente com ID ${id_funcionario} não encontrado.` });
    }

    // Verifica se o cliente é funcionário
    if (funcionario.cargo !== "funcionário") {
      return res
        .status(400)
        .json({
          erro: `O cliente com ID ${id_funcionario} não possui o cargo de funcionário.`,
        });
    }

    // Verifica se a tarefa existe
    const tarefa = await db.get(
      "SELECT * FROM tarefas WHERE id = ?",
      id_tarefa
    );
    if (!tarefa) {
      return res
        .status(404)
        .json({ erro: `Tarefa com ID ${id_tarefa} não encontrada.` });
    }

    // Verifica se a tarefa JÁ FOI atribuída (não pode reassociar)
    if (tarefa.id_funcionário !== null) {
      return res
        .status(400)
        .json({
          erro: `A tarefa com ID ${id_tarefa} já está atribuída a um funcionário.`,
        });
    }

    // Associa a tarefa ao funcionário
    await db.run(
      "UPDATE tarefas SET id_funcionário = ? WHERE id = ?",
      id_funcionario,
      id_tarefa
    );

    res.status(200).json({
      mensagem: `Tarefa de ID ${id_tarefa} associada com sucesso ao funcionário de ID ${id_funcionario}.`,
    });
  } catch (error) {
    next(error);
  }
}

