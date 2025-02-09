<template>
  <div class="history-container">
    <h2>Histórico de Compras</h2>
    <div class="history-list">
      <div v-for="item in purchaseHistory" :key="item.id" class="history-item">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <span class="category">{{ item.category }}</span>
        </div>
        <div class="item-details">
          <span class="price">R$ {{ item.price.toFixed(2) }}</span>
          <span class="date">{{ formatDate(item.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/config'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'

export default {
  name: 'PurchaseHistory',
  setup() {
    const purchaseHistory = ref([])

    const fetchHistory = async () => {
      try {
        const q = query(collection(db, 'shopping-items'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        purchaseHistory.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }))
      } catch (error) {
        console.error('Erro ao buscar histórico:', error)
      }
    }

    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }

    onMounted(fetchHistory)

    return {
      purchaseHistory,
      formatDate
    }
  }
}
</script>

<style scoped>
.history-container {
  padding: 2rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info h3 {
  margin: 0;
  color: #1e293b;
}

.category {
  font-size: 0.875rem;
  color: #64748b;
}

.item-details {
  text-align: right;
}

.price {
  display: block;
  font-weight: 600;
  color: #DF6D14;
}

.date {
  font-size: 0.875rem;
  color: #64748b;
}
</style> 