<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isLogin ? 'Login' : 'Cadastro' }}</h2>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            placeholder="Senha"
            required
          />
        </div>

        <button type="submit" class="auth-btn">
          {{ isLogin ? 'Entrar' : 'Cadastrar' }}
        </button>
      </form>

      <p class="auth-toggle">
        {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
        <button @click="isLogin = !isLogin" class="toggle-btn">
          {{ isLogin ? 'Cadastre-se' : 'Faça login' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

export default {
  name: 'Auth',
  setup() {
    const email = ref('')
    const password = ref('')
    const isLogin = ref(true)

    const handleSubmit = async () => {
      try {
        if (isLogin.value) {
          await signInWithEmailAndPassword(auth, email.value, password.value)
        } else {
          await createUserWithEmailAndPassword(auth, email.value, password.value)
        }
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      email,
      password,
      isLogin,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e4e6e8;
  border-radius: 8px;
  font-size: 1rem;
}

.auth-btn {
  background: #DF6D14;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.auth-btn:hover {
  background: #C14600;
}

.auth-toggle {
  text-align: center;
  margin-top: 1rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #DF6D14;
  cursor: pointer;
  font-weight: 500;
}
</style> 