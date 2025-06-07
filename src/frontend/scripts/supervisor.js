document.addEventListener("DOMContentLoaded", () => {
    // Elementos da página homeSupervisor
    const selectFuncionario = document.getElementById("selectFuncionario");
    const btnVerPendentes = document.getElementById("btnVerPendentes");
    const btnVerConcluidas = document.getElementById("btnVerConcluidas");
    const btnVerTodas = document.getElementById("btnVerTodas");
    const listaTarefas = document.getElementById("listaTarefas");

    // Carrega funcionários no select da homeSupervisor
    async function carregarFuncionarios() {
        if (!selectFuncionario) return;
        try {
            const resposta = await fetch('http://localhost:3000/usuario/funcionarios');
            const funcionarios = await resposta.json();
            selectFuncionario.innerHTML = '<option value="">Selecione...</option>';
            funcionarios.forEach(func => {
                const option = document.createElement('option');
                option.value = func.id;
                option.textContent = func.nome;
                selectFuncionario.appendChild(option);
            });
        } catch (error) {
            alert('Erro ao carregar funcionários');
        }
    }

    // Renderiza tarefas na lista
    function renderizarTarefas(tarefas) {
        if (!listaTarefas) return;
        listaTarefas.innerHTML = '';
        if (!tarefas || tarefas.length === 0) {
            listaTarefas.innerHTML = '<li class="list-group-item">Nenhuma tarefa encontrada.</li>';
            return;
        }
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${tarefa.descricao}</span>
                <span class="badge ${tarefa.estaConcluida ? 'bg-success' : 'bg-warning text-dark'}">
                    ${tarefa.estaConcluida ? 'Concluída' : 'Pendente'}
                </span>
            `;
            listaTarefas.appendChild(li);
        });
    }

    // Buscar tarefas pendentes
    if (btnVerPendentes && selectFuncionario) {
        btnVerPendentes.addEventListener('click', async () => {
            const idFuncionario = selectFuncionario.value;
            if (!idFuncionario) return alert('Selecione um funcionário');
            try {
                const resposta = await fetch(`http://localhost:3000/supervisor/pendentes/${idFuncionario}`);
                const tarefas = await resposta.json();
                renderizarTarefas(tarefas);
            } catch (error) {
                alert('Erro ao buscar tarefas pendentes');
            }
        });
    }

    // Buscar tarefas concluídas
    if (btnVerConcluidas && selectFuncionario) {
        btnVerConcluidas.addEventListener('click', async () => {
            const idFuncionario = selectFuncionario.value;
            if (!idFuncionario) return alert('Selecione um funcionário');
            try {
                const resposta = await fetch(`http://localhost:3000/supervisor/concluidas/${idFuncionario}`);
                const tarefas = await resposta.json();
                renderizarTarefas(tarefas);
            } catch (error) {
                alert('Erro ao buscar tarefas concluídas');
            }
        });
    }

    // Buscar todas as tarefas (pendentes e concluídas)
    if (btnVerTodas && selectFuncionario) {
        btnVerTodas.addEventListener('click', async () => {
            const idFuncionario = selectFuncionario.value;
            if (!idFuncionario) return alert('Selecione um funcionário');
            try {
                const resposta = await fetch(`http://localhost:3000/supervisor/todas/${idFuncionario}`);
                const tarefas = await resposta.json();
                renderizarTarefas(tarefas);
            } catch (error) {
                alert('Erro ao buscar todas as tarefas');
            }
        });
    }

    if (selectFuncionario) {
        carregarFuncionarios();
    }

    // --- Funcionalidades da página criarTarefa.html ---

    // Carregar funcionários no select de associação
    async function carregarFuncionariosAssociar() {
        const selectFuncionarioAssociar = document.getElementById("idFuncionario");
        if (!selectFuncionarioAssociar) return;
        try {
            const resposta = await fetch('http://localhost:3000/usuario/funcionarios');
            const funcionarios = await resposta.json();
            funcionarios.forEach(func => {
                const option = document.createElement('option');
                option.value = func.id;
                option.textContent = func.nome;
                selectFuncionarioAssociar.appendChild(option);
            });
        } catch (error) {
            const mensagem = document.getElementById("mensagem");
            if (mensagem) mensagem.textContent = "Erro ao carregar funcionários.";
        }
    }

    // Criação de tarefa
   const formCriar = document.getElementById("formCriarTarefa");
if (formCriar) {
    formCriar.addEventListener("submit", async (e) => {
        e.preventDefault();
        const idSupervisor = document.getElementById("idSupervisor").value;
        const descricao = document.getElementById("descricaoTarefa").value;
        const mensagem = document.getElementById("mensagem");
        try {
            const resposta = await fetch("http://localhost:3000/supervisor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_supervisor: idSupervisor, descricao })
            });
            const data = await resposta.json();
            if (resposta.ok) {
                mensagem.className = "alert alert-success mt-3";
                mensagem.textContent = `Tarefa criada com sucesso! ID: ${data.tarefaId || data.id}`;
                mensagem.classList.remove("d-none");
                formCriar.reset();
            } else {
                mensagem.className = "alert alert-danger mt-3";
                mensagem.textContent = data.erro || "Erro ao criar tarefa.";
                mensagem.classList.remove("d-none");
            }
        } catch {
            mensagem.className = "alert alert-danger mt-3";
            mensagem.textContent = "Erro ao criar tarefa.";
            mensagem.classList.remove("d-none");
        }
    });
}

    // Associar tarefa a funcionário
    const formAssociar = document.getElementById("formAssociarTarefa");
    if (formAssociar) {
        formAssociar.addEventListener("submit", async (e) => {
            e.preventDefault();
            const idTarefa = document.getElementById("idTarefa").value;
            const idFuncionario = document.getElementById("idFuncionario").value;
            const mensagem = document.getElementById("mensagem");
            try {
                const resposta = await fetch(`http://localhost:3000/supervisor/${idFuncionario}/${idTarefa}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await resposta.json();
                if (resposta.ok) {
                    mensagem.textContent = data.mensagem || "Tarefa associada com sucesso!";
                    formAssociar.reset();
                } else {
                    mensagem.textContent = data.erro || "Erro ao associar tarefa.";
                }
            } catch {
                mensagem.textContent = "Erro ao associar tarefa.";
            }
        });
    }

    // Chame a função para carregar funcionários no select de associação, se existir o select
    if (document.getElementById("idFuncionario")) {
        carregarFuncionariosAssociar();
    }
});