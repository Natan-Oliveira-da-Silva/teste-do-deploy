
# Documentação das Telas do Frontend - Enterprise-Task

## 1. Página Inicial (home_page.html)

**Função:**  
Apresenta o sistema e permite escolher o tipo de usuário para acessar as funcionalidades específicas (Funcionário, Supervisor, Gerente).

**Como usar:**  
- Leia a descrição dos tipos de usuário.
- Clique em um dos botões: **Funcionário**, **Supervisor** ou **Gerente** para acessar a área correspondente.

---

## 2. Área do Funcionário

### a) Tela Inicial do Funcionário (homeFuncionario.html)

**Função:**  
Menu principal do funcionário, com acesso às opções de visualizar tarefas pendentes e concluir tarefas.

**Como usar:**  
- Clique em **Visualizar Tarefas Pendentes** para ver suas tarefas.
- Clique em **Concluir Tarefas** para marcar tarefas como concluídas.
- Use o botão **Voltar** no canto superior esquerdo para retornar à página inicial.

---

### b) Visualizar Tarefas Pendentes (mostrarTarefasPendentes.html)

**Função:**  
Permite ao funcionário consultar todas as tarefas atribuídas a um ID.
Note que não deixamos travados a um ID para que possamos mostrar todos os funcionários que queria ver e testar na mesma tela.
**Como usar:**  
- Selecione seu ID no campo "Digite seu ID".
- Clique em **Buscar Tarefas**.
- As tarefas atribuídas aparecerão na tabela abaixo, mostrando detalhes como ID, supervisor, status e descrição.
- Use o botão **Voltar** para retornar ao menu do funcionário.

---

### c) Concluir Tarefas (concluirTarefa.html)

**Função:**  
Permite ao funcionário marcar uma tarefa como concluída.

**Como usar:**  
- Digite o **ID da tarefa** que deseja concluir.
- Clique em **Conclua Tarefa**.
- Uma mensagem será exibida informando o sucesso ou erro da operação.
- Use o botão **Voltar** para retornar ao menu do funcionário.

---

## 3. Área do Gerente

### a) Tela Inicial do Gerente (homeGerente.html)

**Função:**  
Menu principal do gerente, com acesso às tabelas de tarefas e funcionários disponíveis.

**Como usar:**  
- Clique em **Visualizar Tabela de Tarefas** para acessar o relatório de tarefas.
- Clique em **Ver funcionários sem tarefas pendentes** para ver funcionários disponíveis.
- Use o botão **Voltar** para retornar à página inicial.

---

### b) Tabela de Tarefas (tableTarefas.html)

**Função:**  
Permite ao gerente visualizar tarefas criadas por supervisores e filtrar tarefas por status.

**Como usar:**  
- Selecione um supervisor na lista e clique em **Buscar Supervisor** para ver as tarefas criadas por ele.
- Use os filtros para mostrar **todas** as tarefas ou apenas as **pendentes**.
- As tarefas aparecerão na tabela com detalhes completos.
- Use o botão **Voltar** para retornar ao menu do gerente.

---

### c) Funcionários Disponíveis (tableFuncionarioDisponiveis.html)

**Função:**  
Mostra todos os funcionários que não possuem tarefas pendentes.

**Como usar:**  
- A tabela é carregada automaticamente ao abrir a tela.
- Veja o ID e nome dos funcionários disponíveis.
- Use o botão **Voltar** para retornar ao menu do gerente.

---

## 4. Área do Supervisor


O módulo Supervisor do sistema é composto por três páginas principais, cada uma com uma função específica para o gerenciamento de tarefas dos funcionários.

1. Página Principal do Supervisor (homeSupervisor.html)
Caminho: homeSupervisor.html
Descrição:
Esta é a página inicial do Supervisor. Nela, o usuário encontra botões para acessar rapidamente as principais funcionalidades do módulo:
Relatório de Tarefas dos Funcionários: Permite consultar todas as tarefas (pendentes e concluídas) de qualquer funcionário.
Criar e Associar Tarefa: Permite criar uma nova tarefa e associá-la a um funcionário.
Voltar à Página Inicial: Retorna para a tela principal do sistema.
2. Relatório de Tarefas dos Funcionários (relatorioSupervisor.html)
Caminho: relatorioSupervisor.html
Descrição:
Nesta página, o supervisor pode:
Selecionar um funcionário pelo menu suspenso.
Visualizar todas as tarefas pendentes, concluídas ou ambas, utilizando os botões correspondentes.
Os dados são exibidos em uma lista, facilitando o acompanhamento do status das tarefas.
Há um botão para retornar à página principal do supervisor.
3. Criar e Associar Tarefa (criarTarefa.html)
Caminho: criarTarefa.html
Descrição:
Esta página permite ao supervisor:
Criar uma nova tarefa: Informando o ID do supervisor e a descrição da tarefa.
Associar uma tarefa existente a um funcionário: Selecionando o funcionário e informando o ID da tarefa.
Mensagens de sucesso ou erro são exibidas após cada operação.
Há um botão para retornar à página principal do supervisor.

---

## 5. Scripts

- **funcionario.js**: Gerencia as ações do funcionário (concluir tarefa, visualizar tarefas).
- **gerente.js**: Gerencia as ações do gerente (visualizar tarefas, filtrar, listar funcionários disponíveis).
- **supervisor.js**: Gerencia as ações do supervisor (visualizar tarefas, Criação e Associação de tarefas, listar funcionários e suas tarefas(pendentes e concluídas)).
---

## Observações Gerais

- Todas as telas utilizam Bootstrap para layout responsivo e visual moderno.
- O botão **Voltar** está sempre no canto superior esquerdo das telas internas.
- As ações de busca e conclusão de tarefas exibem mensagens de sucesso ou erro para orientar o usuário.
- Para funcionamento completo, o backend deve estar rodando e acessível nos endpoints indicados nos scripts.

---
