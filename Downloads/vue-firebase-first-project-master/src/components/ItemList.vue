<!-- src/components/ItemList.vue -->
<template>
  <div>
    <h2>Lista de Compras</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <div>
          <span>{{ item.name }} - {{ item.quantity }} - {{ item.category }} - R$ {{ item.price }}</span>
          <button @click="togglePurchased(item)">
            {{ item.purchased ? 'Desmarcar' : 'Marcar como Comprado' }}
          </button>
          <button @click="deleteItem(item.id)">Excluir</button>
        </div>
      </li>
    </ul>
    <h3>Total: R$ {{ total }}</h3>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const items = ref([]);
    const total = ref(0);

    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'shoppingList'));
      items.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      calculateTotal();
    };

    const togglePurchased = async (item) => {
      const itemRef = doc(db, 'shoppingList', item.id);
      await updateDoc(itemRef, { purchased: !item.purchased });
      fetchItems();
    };

    const deleteItem = async (id) => {
      await deleteDoc(doc(db, 'shoppingList', id));
      fetchItems();
    };

    const calculateTotal = () => {
      total.value = items.value.reduce((acc, item) => item.purchased ? acc : acc + item.price, 0);
    };

    onMounted(fetchItems);

    return { items, total, togglePurchased, deleteItem };
  },
};
</script>
