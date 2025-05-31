// src/database/Migrations/criaEPopulaTabelas.js
import { openDb } from '../../configDB.js';

export async function criaEPopulaTabelas() {
  const db = await openDb();

  // Criação da tabela clientes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cargo TEXT NOT NULL CHECK (cargo IN ('gerente', 'supervisor', 'funcionário'))
    );
  `);

  // Criação da tabela tarefas
  // REMOVIDOS os CHECK constraints com subqueries, pois SQLite não os suporta.
  // A validação de id_supervisor e id_funcionário (pelo cargo)
  // DEVE ser feita na camada da aplicação (nos seus serviços ou rotas da API).
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_supervisor INTEGER NOT NULL,
      id_funcionário INTEGER,
      estaConcluida BOOLEAN NOT NULL DEFAULT 0,
      descricao TEXT NOT NULL,
      FOREIGN KEY (id_supervisor) REFERENCES clientes(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      FOREIGN KEY (id_funcionário) REFERENCES clientes(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
    );
  `);

  // Inserção de clientes apenas se a tabela estiver vazia
  const countResult = await db.get(`SELECT COUNT(*) as total FROM clientes`);
  if (countResult.total === 0) {
    console.log('Populando a tabela de clientes...');

    // Inserir 50 funcionários
    const funcionariosData = Array.from({ length: 50 }, (_, i) => ({
      nome: `Funcionário ${i + 1}`,
      cargo: 'funcionário'
    }));

    // Inserir 10 supervisores
    const supervisoresData = [
      { nome: 'Supervisor A', cargo: 'supervisor' },
      { nome: 'Supervisor B', cargo: 'supervisor' },
      { nome: 'Supervisor C', cargo: 'supervisor' },
      { nome: 'Supervisor D', cargo: 'supervisor' },
      { nome: 'Supervisor E', cargo: 'supervisor' },
      { nome: 'Supervisor F', cargo: 'supervisor' },
      { nome: 'Supervisor G', cargo: 'supervisor' },
      { nome: 'Supervisor H', cargo: 'supervisor' },
      { nome: 'Supervisor I', cargo: 'supervisor' },
      { nome: 'Supervisor J', cargo: 'supervisor' }
    ];

    // Inserir 3 gerentes
    const gerentesData = [
      { nome: 'Gerente X', cargo: 'gerente' },
      { nome: 'Gerente Y', cargo: 'gerente' },
      { nome: 'Gerente Z', cargo: 'gerente' }
    ];

    // Função auxiliar para inserção em lote
    async function insertBatch(dataArray, table) {
      const placeholders = dataArray.map(() => '(?, ?)').join(',');
      const values = dataArray.flatMap(item => [item.nome, item.cargo]);
      const sql = `INSERT INTO ${table} (nome, cargo) VALUES ${placeholders};`;
      await db.run(sql, values);
    }

    // Inserindo os dados em lote
    await insertBatch(funcionariosData, 'clientes');
    await insertBatch(supervisoresData, 'clientes');
    await insertBatch(gerentesData, 'clientes');

    console.log('Tabela de clientes populada com sucesso.');
  } else {
    console.log('Tabela de clientes já contém dados. Não populando.');
  }
}