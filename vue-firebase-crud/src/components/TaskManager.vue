<template>
  <div class="task-manager">
    <h1><i class="fas fa-tasks"></i> Gerenciador de Tarefas <i class="fas fa-cog"></i></h1>
    <input v-model="novaTarefa" placeholder="Nova tarefa" />
    <button @click="adicionarTarefa"><i class="fas fa-plus"></i> Adicionar</button>
    <input v-model="consulta" placeholder="Buscar tarefas..." />
    <button @click="atualizarTarefas"><i class="fas fa-sync"></i> Atualizar Tarefas</button>
    <ul>
      <li v-for="tarefa in tarefasFiltradas" :key="tarefa.id">
        <input v-model="tarefa.texto" @blur="atualizarTarefa(tarefa.id, tarefa.texto)" />
        <button @click="excluirTarefa(tarefa.id)"><i class="fas fa-trash"></i> Excluir</button>
        <button @click="concluirTarefa(tarefa.id)"><i class="fas fa-check"></i> Concluir</button>
      </li>
    </ul>
    <div class="status">
      <p>Total de Tarefas: {{ tarefas.length }}</p>
      <p>Tarefas Concluídas: {{ tarefas.filter(t => t.concluida).length }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default {
  setup() {
    const tarefas = ref([]);
    const novaTarefa = ref('');
    const consulta = ref('');
    const colecaoDeTarefas = collection(db, 'tarefas');

    const atualizarTarefas = async () => {
      tarefas.value = [];
      const consultaDeTarefas = await getDocs(colecaoDeTarefas);
      consultaDeTarefas.forEach(doc => {
        tarefas.value.push({ id: doc.id, ...doc.data() });
      });
    };

    const adicionarTarefa = async () => {
      if (novaTarefa.value.trim() === '') return;
      await addDoc(colecaoDeTarefas, { texto: novaTarefa.value, concluida: false });
      novaTarefa.value = '';
      atualizarTarefas();
    };

    const atualizarTarefa = async (id, novoTexto) => {
      const referenciaDaTarefa = doc(db, 'tarefas', id);
      await updateDoc(referenciaDaTarefa, { texto: novoTexto });
      atualizarTarefas();
    };

    const excluirTarefa = async (id) => {
      const referenciaDaTarefa = doc(db, 'tarefas', id);
      await deleteDoc(referenciaDaTarefa);
      atualizarTarefas();
    };

    const concluirTarefa = async (id) => {
      const referenciaDaTarefa = doc(db, 'tarefas', id);
      await updateDoc(referenciaDaTarefa, { concluida: true });
      atualizarTarefas();
    };

    const tarefasFiltradas = computed(() => {
      return tarefas.value.filter(tarefa => tarefa.texto.includes(consulta.value));
    });

    onMounted(atualizarTarefas);

    return { tarefas, novaTarefa, consulta, adicionarTarefa, atualizarTarefa, excluirTarefa, concluirTarefa, tarefasFiltradas };
  }
};
</script>

<style scoped>
.task-manager {
  font-family: 'Arial', sans-serif;
  margin: 20px auto;
}

h1 {
  color: #333;
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
}

input {
  width: calc(100% - 22px);
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #007bff;
  border-radius: 6px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.8);
}

button {
  padding: 12px 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

.status {
  margin-top: 20px;
  text-align: center;
}
</style>