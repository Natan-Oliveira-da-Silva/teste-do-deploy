# 📘 Documentação da API de Tarefas

Esta API permite a criação, atribuição e gerenciamento de tarefas entre funcionários, supervisores e gerentes.

---

## 🔄 Como Rodar a API

Para rodar a API localmente no seu computador, siga as seguintes instruções:
- 1 - Crie uma pasta no seu computador
- 2 - Abra essa pasta no Visual Studio Code
- 3 - No termimal integrado do Visual Studio Code, use o PowerShell para executar os seguintes comandos:
```
git clone git@github.com:ElvisReis2K/Enterprise-Task.git
cd Enterprise-Task/src/API
npm install
npm run dev
````

---

## 🔄 Teste de Conexão

**GET** `/teste`

Essa rota permite que o usuário teste a sua conexão com a API. Essa rota só tem utilidade durante o desenvolvimento, pois não será usada pelo front-end.

### ✅ Resposta de Sucesso
```json
{
  "mensagem": "Você se conectou com a API."
}
````

---

## 👷‍♂️ Rotas que Retornam os Clientes

Segue abaixo as rotas que retornam os clientes.

### 📥 Ver Todas as tarefas pendentes para mim

**GET** `/usuario/todos` -> retorna todos os registros da tabela de clientes

**GET** `/usuario/funcionarios` -> retorna todos os funcionários existentes

**GET** `/usuario/supervisores` -> retorna todos os supervisores existentes

**GET** `/usuario/gerentes` -> retorna todos os gerentes existentes


### ✅ Resposta de Sucesso

* **200 OK**: Array de objetos em que cada objeto do array é um cliente.

```json
[
    {
        "id": 51,
        "nome": "Supervisor A",
        "cargo": "supervisor"
    }
]
```

### ❌ Erros

* **500 Internal Server Error**: Erro interno do servidor.


---

## 👷‍♂️ Funcionalidades Disponíveis para Funcionários

Segue abaixo as rotas disponíveis para funcionários.

### 📥 Ver Todas as tarefas pendentes para mim

**GET** `/funcionario/:id_funcionario`

Essa rota permite que o funcionário veja todas as tarefas pendentes para ele.
Para usar essa rota, basta passar o ID do funcionário na URL da requisição conforme indicado acima.
Em caso de sucesso, a resposta da requisição será um array de objetos. Cada objeto desse array é uma tarefa pendente para o funcionário.

### ✅ Resposta de Sucesso

* **200 OK**: Lista de tarefas pendentes.

```json
[
  {
    "id": 1,
    "descricao": "Entregar relatório",
    "estaConcluida": 0,
    "id_funcionário": 5,
    "id_supervisor": 2,
    "nome_funcionario": "João",
    "nome_supervisor": "Ana"
  }
]
```

### ❌ Possíveis erros

* **400 Bad Request**: ID de funcionário inválido.
* **404 Not Found**: Funcionário não encontrado.
* **400 Bad Request**: O cliente não possui o cargo de funcionário.
* **500 Internal Server Error**: Erro interno do servidor.

---

### ✅ Marcar tarefa como concluída

**PATCH** `/funcionario/:id_tarefa`

Essa rota permite que o funcionário marque uma tarefa como concluída.
Para usar essa rota, basta passar o ID da tarefa na URL da requisição conforme indicado acima.
Em caso de sucesso, a resposta da requisição será um objeto com um item chamado mensagem, que contém uma mensagem que pode ser exibida para o usuário.
Observação: uma tarefa só pode ser marcada como concluída se ela já estiver associada a um funcionário. Tentar marcar como concluída uma tarefa que não tenha sido associada a nenhum funcionário retornará um erro.

### ✅ Resposta de Sucesso

* **200 OK**: Tarefa marcada como concluída.

```json
{ "mensagem": "Tarefa marcada como concluída." }
```

### ❌ Erros

* **400 Bad Request**: ID de tarefa inválido.
* **404 Not Found**: Tarefa não encontrada.
* **400 Bad Request**: A tarefa não está atribuída a um funcionário.
* **500 Internal Server Error**: Erro interno do servidor.

---

## 🧑‍🏫 Funcionalidades Disponíveis para Supervisores

Segue abaixo as rotas disponíveis para supervisores que usam o método GET. Na sequência, serão apresentadas também duas outras rotas disponíveis para supervisores que usam outros métodos.

### 📥 Ver todas as tarefas (pendentes e concluídas) de um funcionário

**GET** `/supervisor/todas/:id_funcionario`

### 📥 Ver todas as tarefas pendentes de um funcionário

**GET** `/supervisor/pendentes/:id_funcionario`

### 📥 Ver todas as tarefas concluídas de um funcionário

**GET** `/supervisor/concluidas/:id_funcionario`


As requisições exclusivas de supervisores listadas acima tem o mesmo formato de resposta de sucesso e os mesmos erros. Segue abaixo o formato-padrão de resposta de sucesso e os possíveis erros que essas requisições podem retornar.

### ✅ Resposta de Sucesso

* **200 OK**: Array (possivelmente vazio) de objetos em que cada objeto do array é uma tarefa.

### ❌ Erros

* **400 Bad Request**: ID de funcionário inválido.
* **404 Not Found**: Funcionário não encontrado.
* **400 Bad Request**: O cliente não possui o cargo de funcionário.
* **500 Internal Server Error**: Erro interno do servidor.

---


### ✏️ Criar tarefa

**POST** `/supervisor`

Essa rota permite que o supervisor crie uma nova tarefa.
Para usar essa rota, basta passar no body da requisição um objeto com os itens "id_supervisor" e "descricao" conforme indicado no exemplo abaixo.
O campo "id_supervisor" deve receber o ID do supervisor que está criando a tarefa e o campo "descricao" deve receber a descrição da tarefa.
Em caso de sucesso, a resposta da requisição será um objeto com o ID da tarefa criada e com uma mensagem que pode ser exibida para o usuário.

#### Corpo da Requisição

```json
{
  "id_supervisor": 2,
  "descricao": "Finalizar orçamento"
}
```

### ✅ Resposta de Sucesso

* **201 Created**

```json
{
  "statusCode": 201,
  "message": "Tarefa criada com sucesso!",
  "tarefaId": 5
}
```

### ❌ Erros

* **400 Bad Request**: ID de supervisor inválido ou descrição ausente/vazia.
* **404 Not Found**: Supervisor não encontrado.
* **400 Bad Request**: O cliente não possui o cargo de supervisor.
* **500 Internal Server Error**: Erro interno do servidor.

---

### 🔗 Associar tarefa a um funcionário

**PATCH** `/supervisor/:id_funcionario/:id_tarefa`

Essa rota permite que o supervisor associe uma tarefa a um funcionário.
Para usar essa rota, basta passar na URL da requisição os IDs de um funcionário e de uma tarefa conforme indicado acima.
Em caso de sucesso, a resposta da requisição será um objeto com um item chamado mensagem, que contém uma mensagem que pode ser exibida para o usuário.
Observação: uma tarefa só pode ser associada a um funcionário se ela não estiver associada a nenhum funcionário. Tentar associar a um funcionário uma tarefa que já tenha uma associação retornará um erro.

### ✅ Resposta de Sucesso

* **200 OK**

```json
{
  "mensagem": "Tarefa de ID 3 associada com sucesso ao funcionário de ID 7."
}
```

### ❌ Erros

* **400 Bad Request**: ID inválido.
* **404 Not Found**: Funcionário ou tarefa não encontrada.
* **400 Bad Request**: Cliente não é funcionário ou tarefa já está atribuída.
* **500 Internal Server Error**: Erro interno do servidor.

---

## 👩‍💼 Funcionalidades Disponíveis para Gerentes

Seguem abaixo as rotas disponíveis para gerentes.

### 📋 Ver todas as tarefas existentes

**GET** `/gerente/todas` -> Esta rota retorna um array com todas as tarefas (PENDENTES E CONCLUÍDAS) existentes no banco de dados.

### 📋 Ver todas as tarefas pendentes

**GET** `/gerente/pendentes` -> Esta rota retorna um array com todas as tarefas PENDENTES existentes no banco de dados.

### 📋 Ver todos os funcionários sem tarefas pendentes

**GET** `/gerente/funcionariosdisponiveis` -> Esta rota retorna um array com todos os funcionários que não possuem tarefas pendentes. Em caso de sucesso, a API retorna um array de objetos em que cada objeto é um funcionário que não tem tarefas pendentes.

### ✅ Resposta de Sucesso

* **200 OK**: Lista de registros (tarefas ou funcionários).

```json
[
  {
    "id": 3,
    "descricao": "Conferir estoque",
    "estaConcluida": 0,
    "id_funcionário": null,
    "id_supervisor": 1
  }
]
```

### ❌ Erros

* **500 Internal Server Error**: Erro interno do servidor.

---

### 📋 Ver todas as tarefas criadas por um supervisor

**GET** `/gerente/:id_supervisor`

Essa rota permite que o gerente veja todas as tarefas criadas por um determinado supervisor.
Para usar essa rota, basta passar o ID do supervisor na URL da requisição conforme indicado acima.
Em caso de sucesso, a resposta da requisição será um array de objetos em que cada objeto do array é uma tarefa que foi criada pelo supervisor indicado.

### ✅ Resposta de Sucesso

* **200 OK**: Lista de tarefas criadas pelo supervisor.

### ❌ Erros

* **400 Bad Request**: ID de supervisor inválido.
* **404 Not Found**: Supervisor não encontrado.
* **400 Bad Request**: O cliente não possui o cargo de supervisor.
* **500 Internal Server Error**: Erro interno do servidor.

---

## ℹ️ Notas Gerais

* Respostas com **listas** podem retornar **arrays vazios** se não houver dados no banco.
* Em qualquer rota:

  * **404 Not Found** será retornado para rotas inexistentes.
  * **400 Bad Request** será retornado para dados inválidos (IDs não numéricos, negativos, campos obrigatórios ausentes etc).
  * **500 Internal Server Error** indica falha não tratada no servidor (como erro de conexão com banco de dados).

---

## 🧪 Exemplo de resposta para rota inexistente

**GET** `/rota/que-nao-existe`

### ❌ Resposta

```json
{
  "error": "Rota não encontrada."
}
```

---

## 🧪 Exemplo de erro interno

**GET** `/gerente/todas` (simulando erro de banco)

### ❌ Resposta

```json
{
  "erro": "Erro interno do servidor."
}
```
