/* quando abrir carregar funçao de listar tarefas   */
window.onload = () => {
  listarTarefas();
};
let todasTarefas = [];

/* acessa a rota na api e busca tarefas dando a resposta em json */
async function listarTarefas() {
  const res = await fetch("http://localhost:3000/tarefas");
  todasTarefas = await res.json();
  atualizarContador();
  

  renderizarTarefas(todasTarefas);
}
  
/* funçao de criar tarefa , le o input que o usuario digitar verifica se nao e vazio  */
async function criarTarefa() {
  const input = document.getElementById("tarefaInput");

  if (!input.value) return;

  await fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome_tarefa: input.value
    })
  });

  input.value = "";
  listarTarefas();
  atualizarContador();
}

/* funçao para deletar tarefas passando id e acessando api por meio do metodo delete  */
async function deletarTarefa(id) {
  await fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE"
  });

  listarTarefas();
  atualizarContador();
}

/* funçao concluir atualiza a tarefa e marca como concluido = true  */
async function concluirTarefa(id) {
  await fetch(`http://localhost:3000/tarefas/${id}/concluir`, {
    method: "PATCH"
  });

  listarTarefas();
  atualizarContador();
}

function renderizarTarefas(lista) {
  const container = document.getElementById("listaTarefas");
  container.innerHTML = "";

  lista.forEach(tarefa => {
    const div = document.createElement("div");

    div.className = `task ${tarefa.concluida ? "concluida" : ""}`;

    div.innerHTML = `
      <span class="task-text">
        ${tarefa.nome_tarefa}
      </span>

      <div class="task-actions">
        <button onclick="concluirTarefa(${tarefa.id})">✔</button>
        <button onclick="deletarTarefa(${tarefa.id})">🗑</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function filtrarTodas() {
  renderizarTarefas(todasTarefas);
}

function filtrarPendentes() {
  renderizarTarefas(todasTarefas.filter(t => !t.concluida));
}

function filtrarConcluidas() {
  renderizarTarefas(todasTarefas.filter(t => t.concluida));
}

function atualizarContador() {
  const total = todasTarefas.length;
  const concluidas = todasTarefas.filter(t => t.concluida).length;

  const contador = document.getElementById("contador");

  contador.textContent = `${concluidas} de ${total} concluídas`;
}