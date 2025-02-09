<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- User Profile Section -->
      <div class="user-profile">
        <div class="user-info">
          <span class="welcome-text">Bem-vindo,</span>
          <span class="user-name">{{ user?.displayName || user?.email?.split('@')[0] }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn" title="Sair">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>

      <div class="logo-container">
        <i class="fas fa-shopping-cart text-3xl"></i>
        <h1>ShopList</h1>
      </div>
      
      <nav class="nav-menu">
        <a href="#" class="nav-item active">
          <i class="fas fa-home"></i>
          <span>Início</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fas fa-history"></i>
          <span>Histórico</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fas fa-chart-pie"></i>
          <span>Relatórios</span>
        </a>
      </nav>

      <!-- Stats Cards -->
      <div class="stats-section">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-shopping-basket"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ items.length }}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon green">
            <i class="fas fa-check"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ purchasedCount }}</span>
            <span class="stat-label">Comprados</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon orange">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ pendingCount }}</span>
            <span class="stat-label">Pendentes</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Banner do Supermercado -->
      <div class="supermarket-banner">
        <img 
          src="https://images.unsplash.com/photo-1578916171728-46686eac8d58"
          alt="Supermercado"
          class="banner-image"
        />
        <div class="banner-overlay">
          <div class="banner-content">
            <h1 class="banner-title">Lista de Compras</h1>
            <p class="banner-subtitle">Organize suas compras de forma eficiente</p>
          </div>
        </div>
      </div>

      <header class="main-header">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar itens...">
        </div>
        
        <div class="header-actions">
          <button class="filter-btn" @click="showOnlyPending = !showOnlyPending">
            <i class="fas fa-filter"></i>
            Pendentes
          </button>
          <select v-model="filterCategory" class="category-select">
            <option value="">Todas Categorias</option>
            <option value="alimentos">🍎 Alimentos</option>
            <option value="limpeza">🧹 Limpeza</option>
            <option value="bebidas">🥤 Bebidas</option>
            <option value="outros">📦 Outros</option>
          </select>
        </div>
      </header>

      <!-- Add Item Form -->
      <div class="add-item-section">
        <form @submit.prevent="addItem" class="add-item-form">
          <input 
            v-model="newItem.name" 
            type="text"
            class="form-input"
            placeholder="Nome do item"
            required
          >
          
          <input 
            v-model.number="newItem.price" 
            type="number"
            step="0.01"
            class="form-input"
            placeholder="R$ 0,00"
            required
          >
          
          <select v-model="newItem.category" class="form-input">
            <option value="alimentos">🍎 Alimentos</option>
            <option value="limpeza">🧹 Limpeza</option>
            <option value="bebidas">🥤 Bebidas</option>
            <option value="outros">📦 Outros</option>
          </select>

          <button type="submit" class="add-btn">
            <i class="fas fa-plus"></i>
          </button>
        </form>
      </div>

      <!-- Shopping List -->
      <div class="shopping-list">
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
          Carregando itens...
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error-state">
          {{ error }}
          <button @click="fetchItems" class="retry-btn">
            Tentar novamente
          </button>
        </div>

        <!-- Empty state -->
        <div v-else-if="items.length === 0" class="empty-state">
          Nenhum item na lista ainda.
        </div>

        <!-- Items list -->
        <div v-else v-for="item in filteredItems" 
             :key="item.id" 
             class="list-item"
             :class="{ 'purchased': item.purchased }">
          <div class="item-check">
            <input 
              type="checkbox" 
              v-model="item.purchased" 
              @change="updateItem(item)"
            >
          </div>
          <div class="item-content">
            <h3>{{ item.name }}</h3>
            <span class="item-category" :class="item.category">
              {{ item.category }}
            </span>
          </div>
          <div class="item-price">
            R$ {{ item.price.toFixed(2) }}
          </div>
          <div class="item-actions">
            <button @click="editItem(item)" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteItem(item.id)" class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Total Section Atualizada -->
      <div class="total-section">
        <div class="total-card">
          <div class="total-info">
            <div class="total-header">
              <i class="fas fa-shopping-cart"></i>
              <h3>Total da Lista</h3>
            </div>
            <div class="total-details">
              <div class="detail-item">
                <span>Itens</span>
                <span>{{ items.length }}</span>
              </div>
              <div class="detail-item">
                <span>Pendentes</span>
                <span>{{ pendingCount }}</span>
              </div>
              <div class="detail-item">
                <span>Comprados</span>
                <span>{{ purchasedCount }}</span>
              </div>
            </div>
          </div>
          <div class="total-value">
            <span class="value-label">Total</span>
            <span class="value-amount">R$ {{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Adicione estes botões onde desejar -->
      <div class="share-section">
        <div class="share-grid">
          <!-- PDF -->
          <button @click="exportToPDF" class="share-btn pdf">
            <div class="btn-icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div class="btn-text">
              <span class="btn-title">Exportar PDF</span>
              <span class="btn-desc">Salvar como documento PDF</span>
            </div>
          </button>

          <!-- Excel -->
          <button @click="exportToExcel" class="share-btn excel">
            <div class="btn-icon">
              <i class="fas fa-file-excel"></i>
            </div>
            <div class="btn-text">
              <span class="btn-title">Exportar Excel</span>
              <span class="btn-desc">Salvar como planilha</span>
            </div>
          </button>

          <!-- WhatsApp -->
          <button @click="shareWhatsApp" class="share-btn whatsapp">
            <div class="btn-icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div class="btn-text">
              <span class="btn-title">WhatsApp</span>
              <span class="btn-desc">Compartilhar no WhatsApp</span>
            </div>
          </button>

          <!-- Email -->
          <button @click="shareEmail" class="share-btn email">
            <div class="btn-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="btn-text">
              <span class="btn-title">Email</span>
              <span class="btn-desc">Enviar por email</span>
            </div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { db, auth } from '../firebase/config'
import { useRouter } from 'vue-router'
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

export default {
  name: 'ShoppingList',
  setup() {
    console.log('DB:', db)
    const items = ref([])
    const loading = ref(true)
    const error = ref(null)
    const newItem = ref({
      name: '',
      price: 0,
      category: 'alimentos',
      purchased: false
    })
    const filterCategory = ref('')
    const showOnlyPending = ref(false)
    const router = useRouter()
    const user = ref(auth.currentUser)
    
    // Adicione a função de logout
    const handleLogout = async () => {
      try {
        await auth.signOut()
        router.push('/')
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    }

    // Monitore mudanças no usuário
    onMounted(() => {
      auth.onAuthStateChanged((currentUser) => {
        user.value = currentUser
      })
    })

    // Calcular total
    const total = computed(() => {
      return items.value.reduce((sum, item) => sum + item.price, 0)
    })

    // Computed properties para filtros
    const filteredItems = computed(() => {
      return items.value.filter(item => {
        if (showOnlyPending.value && item.purchased) return false
        if (filterCategory.value && item.category !== filterCategory.value) return false
        return true
      })
    })

    // Estatísticas
    const purchasedCount = computed(() => 
      items.value.filter(item => item.purchased).length
    )
    
    const pendingCount = computed(() => 
      items.value.filter(item => !item.purchased).length
    )

    // Agrupar por categoria
    const itemsByCategory = computed(() => {
      const grouped = {}
      items.value.forEach(item => {
        if (!grouped[item.category]) {
          grouped[item.category] = []
        }
        grouped[item.category].push(item)
      })
      return grouped
    })

    // Buscar itens
    const fetchItems = async () => {
      loading.value = true
      error.value = null
      
      try {
        console.log('Tentando buscar itens...')
        const colRef = collection(db, 'shopping-items')
        console.log('Referência da coleção:', colRef)
        
        const snapshot = await getDocs(colRef)
        console.log('Snapshot:', snapshot)
        
        items.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        console.log('Itens carregados:', items.value)
      } catch (err) {
        console.error('Erro ao buscar:', err)
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    // Adicionar item com atualização otimizada
    const addItem = async () => {
      let tempId = null
      try {
        if (!newItem.value.name || newItem.value.price <= 0) {
          alert('Por favor, preencha todos os campos corretamente')
          return
        }

        const itemData = {
          name: newItem.value.name,
          price: Number(newItem.value.price),
          category: newItem.value.category,
          purchased: false,
          createdAt: new Date()
        }

        // Adiciona o item localmente primeiro
        tempId = Date.now().toString()
        items.value.push({ id: tempId, ...itemData })

        // Depois salva no Firebase
        const docRef = await addDoc(collection(db, 'shopping-items'), itemData)
        
        // Atualiza o ID correto
        const index = items.value.findIndex(item => item.id === tempId)
        if (index !== -1) {
          items.value[index].id = docRef.id
        }

        // Limpa o formulário
        newItem.value = {
          name: '',
          price: 0,
          category: 'alimentos',
          purchased: false
        }
      } catch (error) {
        console.error('Erro ao adicionar:', error)
        // Remove o item se houver erro
        if (tempId) {
          items.value = items.value.filter(item => item.id !== tempId)
        }
        alert('Erro ao adicionar item. Por favor, tente novamente.')
      }
    }

    // Atualizar item com otimização
    const updateItem = async (item) => {
      try {
        // Atualiza localmente primeiro
        const index = items.value.findIndex(i => i.id === item.id)
        if (index !== -1) {
          items.value[index] = { ...item }
        }

        // Depois atualiza no Firebase
        const itemRef = doc(db, 'shopping-items', item.id)
        await updateDoc(itemRef, {
          purchased: item.purchased
        })
      } catch (error) {
        console.error('Erro ao atualizar:', error)
        // Reverte a mudança em caso de erro
        await fetchItems()
      }
    }

    // Editar item
    const editItem = async (item) => {
      const newName = prompt('Novo nome:', item.name)
      const newPrice = parseFloat(prompt('Novo preço:', item.price))
      if (newName && newPrice) {
        const itemRef = doc(db, 'shopping-items', item.id)
        await updateDoc(itemRef, {
          name: newName,
          price: newPrice
        })
        await fetchItems()
      }
    }

    // Excluir item com otimização
    const deleteItem = async (id) => {
      try {
        // Remove localmente primeiro
        items.value = items.value.filter(item => item.id !== id)

        // Depois remove do Firebase
        await deleteDoc(doc(db, 'shopping-items', id))
      } catch (error) {
        console.error('Erro ao excluir:', error)
        // Recarrega a lista em caso de erro
        await fetchItems()
      }
    }

    const exportToPDF = () => {
      const doc = new jsPDF()
      
      doc.text('Lista de Compras', 14, 15)
      
      const tableColumn = ["Item", "Preço", "Categoria", "Status"]
      const tableRows = items.value.map(item => [
        item.name,
        `R$ ${item.price.toFixed(2)}`,
        item.category,
        item.purchased ? 'Comprado' : 'Pendente'
      ])

      doc.autoTable(tableColumn, tableRows, { startY: 20 })
      doc.save('lista-de-compras.pdf')
    }

    const exportToExcel = () => {
      const data = items.value.map(item => ({
        Item: item.name,
        Preço: item.price,
        Categoria: item.category,
        Status: item.purchased ? 'Comprado' : 'Pendente'
      }))

      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Lista de Compras")
      XLSX.writeFile(wb, 'lista-de-compras.xlsx')
    }

    const shareWhatsApp = () => {
      const text = items.value.map(item => 
        `${item.name} - R$ ${item.price.toFixed(2)}`
      ).join('\n')
      
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(url, '_blank')
    }

    const shareEmail = () => {
      const subject = 'Lista de Compras'
      const body = items.value.map(item => 
        `${item.name} - R$ ${item.price.toFixed(2)}`
      ).join('\n')
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    // Carregar itens quando o componente montar
    onMounted(() => {
      console.log('Componente montado, buscando itens...')
      fetchItems()
    })

    return {
      items,
      loading,
      error,
      newItem,
      total,
      addItem,
      updateItem,
      editItem,
      deleteItem,
      filterCategory,
      showOnlyPending,
      filteredItems,
      purchasedCount,
      pendingCount,
      itemsByCategory,
      exportToPDF,
      exportToExcel,
      shareWhatsApp,
      shareEmail,
      user,
      handleLogout
    }
  }
}
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background: #f0f2f5;
}

/* Sidebar Styles */
.sidebar {
  background: #ffffff;
  padding: 2rem;
  border-right: 1px solid #e4e6e8;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #DF6D14;
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: #64748b;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: #f8f9fa;
  color: #DF6D14;
}

.nav-item.active {
  background: #DF6D14;
  color: white;
}

/* Stats Section */
.stats-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #DF6D14;
  color: white;
  border-radius: 10px;
}

.stat-icon.green { background: #9DC08B; }
.stat-icon.orange { background: #C14600; }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

/* Main Content */
.main-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.search-bar input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

/* Form Styles */
.add-item-section {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.add-item-form {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #DF6D14;
  box-shadow: 0 0 0 3px rgba(223, 109, 20, 0.1);
  background: #ffffff;
}

.form-input::placeholder {
  color: #94a3b8;
}

select.form-input {
  cursor: pointer;
  padding-right: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.2rem;
  appearance: none;
}

.add-btn {
  background: #DF6D14;
  color: white;
  border: none;
  border-radius: 6px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: #C14600;
  transform: translateY(-1px);
}

.add-btn i {
  font-size: 1rem;
}

/* Shopping List */
.shopping-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.list-item.purchased {
  opacity: 0.7;
}

.item-check input {
  width: 20px;
  height: 20px;
  border-radius: 6px;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-content h3 {
  font-size: 1rem;
  font-weight: 500;
}

.item-category {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.item-category.alimentos { background: #dcfce7; color: #166534; }
.item-category.limpeza { background: #dbeafe; color: #1e40af; }
.item-category.bebidas { background: #fef3c7; color: #92400e; }
.item-category.outros { background: #f3e8ff; color: #6b21a8; }

.item-price {
  font-weight: 600;
  color: #DF6D14;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.edit-btn { color: #64748b; }
.delete-btn { color: #ef4444; }

.edit-btn:hover { background: #f1f5f9; }
.delete-btn:hover { background: #fef2f2; }

/* Total Section Updated Styles */
.total-section {
  margin-top: 2rem;
  padding: 1rem;
}

.total-card {
  background: linear-gradient(135deg, #DF6D14, #C14600);
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(223, 109, 20, 0.3);
}

.total-info {
  flex: 1;
}

.total-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.total-header i {
  font-size: 1.5rem;
}

.total-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.total-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item span:first-child {
  font-size: 0.875rem;
  opacity: 0.9;
}

.detail-item span:last-child {
  font-size: 1.25rem;
  font-weight: 600;
}

.total-value {
  text-align: right;
  padding-left: 2rem;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.value-label {
  display: block;
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
}

.value-amount {
  font-size: 2rem;
  font-weight: 700;
}

/* Responsividade */
@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .add-item-form {
    grid-template-columns: 1fr;
  }

  .main-header {
    flex-direction: column;
  }

  .add-btn {
    width: 100%;
    height: 42px;
  }

  .total-card {
    flex-direction: column;
    gap: 1.5rem;
  }

  .total-details {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .total-value {
    border-left: none;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    padding-left: 0;
    padding-top: 1rem;
    text-align: center;
    width: 100%;
  }
}

/* Estilos do Banner */
.supermarket-banner {
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: 2rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(223, 109, 20, 0.3),
    rgba(223, 109, 20, 0.7)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.banner-content {
  text-align: center;
  color: white;
}

.banner-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Responsividade do banner */
@media (max-width: 768px) {
  .supermarket-banner {
    height: 200px;
    margin: -1rem -1rem 1rem -1rem;
    border-radius: 0;
  }

  .banner-title {
    font-size: 1.8rem;
  }

  .banner-subtitle {
    font-size: 1rem;
  }
}

/* Adicione estes estilos */
.share-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin: 1rem 0;
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.btn-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.5rem;
}

.btn-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.btn-title {
  font-weight: 600;
  font-size: 1rem;
}

.btn-desc {
  font-size: 0.75rem;
  color: #64748b;
}

/* Estilos específicos para cada botão */
.pdf {
  border-color: #ef4444;
}

.pdf .btn-icon {
  background: #fef2f2;
  color: #ef4444;
}

.pdf:hover {
  background: #fef2f2;
}

.excel {
  border-color: #22c55e;
}

.excel .btn-icon {
  background: #f0fdf4;
  color: #22c55e;
}

.excel:hover {
  background: #f0fdf4;
}

.whatsapp {
  border-color: #25d366;
}

.whatsapp .btn-icon {
  background: #dcfce7;
  color: #25d366;
}

.whatsapp:hover {
  background: #dcfce7;
}

.email {
  border-color: #0ea5e9;
}

.email .btn-icon {
  background: #f0f9ff;
  color: #0ea5e9;
}

.email:hover {
  background: #f0f9ff;
}

/* Efeito hover geral */
.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Responsividade */
@media (max-width: 768px) {
  .share-grid {
    grid-template-columns: 1fr;
  }
  
  .share-btn {
    padding: 0.75rem;
  }
  
  .btn-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
}

.loading-state,
.error-state,
.empty-state {
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  margin: 1rem 0;
}

.error-state {
  color: #ef4444;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #dc2626;
}

/* User Profile Styles */
.user-profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.welcome-text {
  font-size: 0.75rem;
  color: #64748b;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
}

.logout-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: #fee2e2;
  color: #ef4444;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #fecaca;
  transform: translateY(-1px);
}
</style> 