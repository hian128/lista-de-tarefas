window.onload = () => {
  listarTarefas();
};
let todasTarefas = [];

async function listarTarefas() {
  const res = await fetch("http://localhost:3000/tarefas");
  todasTarefas = await res.json();
  atualizarContador();
  

  renderizarTarefas(todasTarefas);
}
  

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

async function deletarTarefa(id) {
  await fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE"
  });

  listarTarefas();
  atualizarContador();
}

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