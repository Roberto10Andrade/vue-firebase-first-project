<template>
  <div class="reports-container">
    <h2>Relatórios</h2>
    
    <div class="reports-grid">
      <!-- Total Gasto -->
      <div class="report-card">
        <h3>Total Gasto</h3>
        <div class="value">R$ {{ totalSpent.toFixed(2) }}</div>
      </div>

      <!-- Itens por Categoria -->
      <div class="report-card">
        <h3>Itens por Categoria</h3>
        <div class="category-list">
          <div v-for="(count, category) in itemsByCategory" :key="category" class="category-item">
            <span>{{ category }}</span>
            <span>{{ count }}</span>
          </div>
        </div>
      </div>

      <!-- Status das Compras -->
      <div class="report-card">
        <h3>Status das Compras</h3>
        <div class="status-info">
          <div>Comprados: {{ purchasedCount }}</div>
          <div>Pendentes: {{ pendingCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default {
  name: 'ReportsPage',
  setup() {
    const items = ref([])

    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'shopping-items'))
        items.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Erro ao buscar itens:', error)
      }
    }

    const totalSpent = computed(() => {
      return items.value.reduce((total, item) => total + Number(item.price), 0)
    })

    const itemsByCategory = computed(() => {
      return items.value.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {})
    })

    const purchasedCount = computed(() => {
      return items.value.filter(item => item.purchased).length
    })

    const pendingCount = computed(() => {
      return items.value.filter(item => !item.purchased).length
    })

    onMounted(fetchItems)

    return {
      totalSpent,
      itemsByCategory,
      purchasedCount,
      pendingCount
    }
  }
}
</script>

<style scoped>
.reports-container {
  padding: 2rem;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.report-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.report-card h3 {
  color: #64748b;
  margin-bottom: 1rem;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  color: #DF6D14;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.1rem;
}
</style> 