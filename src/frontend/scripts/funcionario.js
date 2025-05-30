// Script para concluir tarefas de funcionários
const tarefaID = document.getElementById('tarefaID').value;
const url = `#`;

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tarefaID: tarefaID })
}).then(responde => responde.json()).then(data=>{
    console.log(data); //verifica se o id foi enviado corretamente
}).catch(error => {
    console.error('Erro ao enviar o ID da tarefa:', error);
});

