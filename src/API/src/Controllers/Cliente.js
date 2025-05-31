import { openDb } from "../configDB.js";
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
export async function pegaTodosOsClientes(req, res, next) {
  try {
    const db = await openDb();

    const clientes = await db.all(`
      SELECT c.id, c.nome
      FROM clientes c
      LEFT JOIN tarefas t 
        ON c.id = t.id_funcionário AND t.estaConcluida = 0
    `);

    res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
}
export async function pegaTodosOsFuncionarios(req, res, next) {
  try {
    const db = await openDb();

    const funcionarios = await db.all(`
      SELECT * FROM clientes WHERE cargo = 'funcionário'
    `);

    res.status(200).json(funcionarios);
  } catch (error) {
    next(error);
  }
}
export async function pegaTodosOsSupervisores(req, res, next) {
  try {
    const db = await openDb();

    const supervisores = await db.all(`
      SELECT * FROM clientes WHERE cargo = 'supervisor'
    `);

    res.status(200).json(supervisores);
  } catch (error) {
    next(error);
  }
}
export async function pegaTodosOsGerentes(req, res, next) {
  try {
    const db = await openDb();

    const gerentes = await db.all(`
      SELECT * FROM clientes WHERE cargo = 'gerente'
    `);

    res.status(200).json(gerentes);
  } catch (error) {
    next(error);
  }
}