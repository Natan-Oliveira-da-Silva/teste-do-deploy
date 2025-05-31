// Script para concluir tarefas de funcionários
function concluirTarefa(e) {
    e.preventDefault();
const tarefaID = document.getElementById('tarefaId').value;
const url = `http://localhost:3000/funcionario/${tarefaID}`;
console.log(tarefaID);
fetch(url,{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: tarefaID })
}).then(responde => responde.json()).then(data=>{
    console.log(data); //verifica se o id foi enviado corretamente
    alert(data.message || 'Tarefa concluída com sucesso!'); // Exibe mensagem de sucesso
}).catch(error => {
    console.error('Erro ao enviar o ID da tarefa:', error);
});
}

// Função para visualizar o status da tarefa

function visualizarStatusTarefa(e){
    e.preventDefault();

const funcionarioID = document.getElementById('funcionarioID').value;
const url = `http://localhost:3000/funcionario/${funcionarioID}`

fetch(url ,{
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
        alert('Nenhuma tarefa encontrada para este funcionário.');
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
        <td>${tarefa.id_funcionário}</td>
        <td>${tarefa.nome_funcionario}</td>
        <td>${tarefa.descricao}</td>
        `;
        tarefaContainer.appendChild(tr);
    });
})
.catch(error => {
    console.error('Erro ao buscar as tarefas:', error); 
});
}