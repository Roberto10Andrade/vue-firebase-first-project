<!-- src/components/AddItem.vue -->
<template>
  <div>
    <h2>Adicionar Item</h2>
    <form @submit.prevent="addItem">
      <input v-model="name" placeholder="Nome do Item" required />
      <input v-model="quantity" type="number" placeholder="Quantidade" required />
      <input v-model="category" placeholder="Categoria" required />
      <input v-model="price" type="number" placeholder="Preço" required />
      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  data() {
    return {
      name: '',
      quantity: 1,
      category: '',
      price: 0,
    };
  },
  methods: {
    async addItem() {
      const item = {
        name: this.name,
        quantity: this.quantity,
        category: this.category,
        price: parseFloat(this.price),
        purchased: false,
      };

      try {
        await addDoc(collection(db, 'shoppingList'), item);
        this.name = '';
        this.quantity = 1;
        this.category = '';
        this.price = 0;
      } catch (e) {
        console.error("Erro ao adicionar item: ", e);
      }
    },
  },
};
</script>
