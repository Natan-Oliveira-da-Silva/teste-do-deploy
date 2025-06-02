// Função para buscar e exibir as tarefas do supervisor
function visualizarTarefas(e) {
    e.preventDefault();
    const SupervisorID = document.getElementById('SupervisorID').value;
    const url = `http://localhost:3000/gerente/${SupervisorID}`
    console.log(SupervisorID); // Verifica a URL que está sendo chamada
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(responde => responde.json())
        .then(data => {
            const tarefas = Array.isArray(data) ? data : [data];
            const mensagem = data.mensagem || data.erro;

            if (mensagem) {
                alert(mensagem); // Exibe mensagem de erro ou sucesso
                return;
            }
            if (tarefas.length === 0) {
                alert('Nenhuma tarefa encontrada deste supervisor.');
                return;
            }
            const tarefaContainer = document.getElementById('tarefaContainer');
            tarefaContainer.innerHTML = ''; // Limpa o conteúdo anterior

            tarefas.forEach(tarefa => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
        <td>${tarefa.id}</td>
        <td>${tarefa.id_supervisor}</td>
        <td>${tarefa.nome_supervisor}</td>
        <td>${tarefa.estaConcluida ? 'Concluída' : 'Pendente'}</td>
        <td>${tarefa.id_funcionário != null ? tarefa.id_funcionário : 'Não atribuido'}</td>
        <td>${tarefa.nome_funcionario != null ? tarefa.id_funcionário : 'Não atribuido'}</td>
        <td>${tarefa.descricao}</td>
        `;
                tarefaContainer.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar as tarefas:', error);
        });
}

// Função para filtrar as tarefas dos funcionários
function filtrar(e) {
    const valorFiltro = e.target.value;
    console.log(valorFiltro); // Verifica o valor do filtro

    if (valorFiltro === "todas") {
        fetch('http://localhost:3000/gerente/todas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(responde => responde.json()).then(data => {
            const tarefas = Array.isArray(data) ? data : [data];
            const mensagem = data.mensagem || data.erro;

            if (mensagem) {
                alert(mensagem); // Exibe mensagem de erro ou sucesso
                return;
            }
            if (tarefas.length === 0) {
                alert('Nenhuma tarefa encontrada.');
                return;
            }
            const tarefaContainer = document.getElementById('tarefaContainer');
            tarefaContainer.innerHTML = ''; // Limpa o conteúdo anterior

            tarefas.forEach(tarefa => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${tarefa.id}</td>
                <td>${tarefa.id_supervisor}</td>
                <td>${tarefa.nome_supervisor}</td>
                <td>${tarefa.estaConcluida ? 'Concluída' : 'Pendente'}</td>
                <td>${tarefa.id_funcionário != null ? tarefa.id_funcionário : 'Não atribuido'}</td>
                <td>${tarefa.nome_funcionario != null ? tarefa.id_funcionário : 'Não atribuido'}</td>
                <td>${tarefa.descricao}</td>
                `;
                tarefaContainer.appendChild(tr);
            });
        }).catch(error => {
            console.error('Erro ao buscar as tarefas:', error);
        });

    } else if (valorFiltro === "pendentes") {
        fetch('http://localhost:3000/gerente/pendentes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(responde => responde.json()).then(data => {
            const tarefas = Array.isArray(data) ? data : [data];
            const mensagem = data.mensagem || data.erro;

            if (mensagem) {
                alert(mensagem); // Exibe mensagem de erro ou sucesso
                return;
            }
            if (tarefas.length === 0) {
                alert('Nenhuma tarefa pendente encontrada.');
                return;
            }
            const tarefaContainer = document.getElementById('tarefaContainer');
            tarefaContainer.innerHTML = ''; // Limpa o conteúdo anterior

            tarefas.forEach(tarefa => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${tarefa.id}</td>
                <td>${tarefa.id_supervisor}</td>
                <td>${tarefa.nome_supervisor}</td>
                <td>${tarefa.estaConcluida ? 'Concluída' : 'Pendente'}</td>
                <td>${tarefa.id_funcionário != null ? tarefa.id_funcionário : 'Não atribuido'}</td>
                <td>${tarefa.nome_funcionario != null ? tarefa.id_funcionário : 'Não atribuido'}</td>
                <td>${tarefa.descricao}</td>
                `;
                tarefaContainer.appendChild(tr);
            });
        }).catch(error => {
            console.error('Erro ao buscar as tarefas:', error);
        });

    }
}

// Carregar todos os supervisores disponíveis
window.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/usuario/supervisores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(responde => responde.json())
    .then(sup => {
        const Supervisor = document.getElementById('SupervisorID');
        sup.forEach(supervisor => {
            const option = document.createElement('option');
            option.value = supervisor.id;
            option.textContent = `${supervisor.nome} (${supervisor.id})`;
            Supervisor.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os supervisores:', error);
    });
})

window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/gerente/funcionariosdisponiveis', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(responde => responde.json()).then(funcionarios => {
        console.log(funcionarios); // Verifica os dados recebidos
        const mensagem = funcionarios.mensagem || funcionarios.erro;
            if (mensagem) {
                alert(mensagem); // Exibe mensagem de erro ou sucesso
                return;
            }
            if (funcionarios.length === 0) {
                alert('Nenhuma tarefa pendente encontrada.');
                return;
            }
        const FuncionarioContainer = document.getElementById('FuncionarioContainer');
        FuncionarioContainer.innerHTML = ''; // Limpa o conteúdo anterior
        funcionarios.forEach(funcionario=> {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${funcionario.id}</td>
                <td>${funcionario.nome}</td>
                
            `;
            FuncionarioContainer.appendChild(tr);
        })
    }).catch(error => {
        console.error('Erro ao carregar os funcionários disponíveis:', error);
    });
})
