import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/config'
import LoginPage from '../components/Login.vue'
import ShoppingList from '../components/ShoppingList.vue'
import PurchaseHistory from '../components/PurchaseHistory.vue'
import ReportsPage from '../components/Reports.vue'

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/lista',
    name: 'ShoppingList',
    component: ShoppingList,
    meta: { requiresAuth: true }
  },
  {
    path: '/historico',
    name: 'PurchaseHistory',
    component: PurchaseHistory,
    meta: { requiresAuth: true }
  },
  {
    path: '/relatorios',
    name: 'ReportsPage',
    component: ReportsPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Variável para controlar o estado de inicialização
let authInitialized = false

// Proteção das rotas
router.beforeEach(async (to, from, next) => {
  // Aguarda a inicialização do Firebase Auth apenas uma vez
  if (!authInitialized) {
    await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        authInitialized = true
        unsubscribe()
        resolve()
      })
    })
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = auth.currentUser

  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router 