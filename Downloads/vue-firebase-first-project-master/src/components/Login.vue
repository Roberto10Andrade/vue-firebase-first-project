<template>
  <div class="login-container">
    <div class="login-content">
      <!-- Lado esquerdo - Imagem/Banner -->
      <div class="login-banner">
        <div class="banner-overlay">
          <div class="banner-content">
            <h2>Bem-vindo ao ShopList</h2>
            <p>Organize suas compras de forma simples e eficiente</p>
          </div>
        </div>
      </div>

      <!-- Lado direito - Formulário -->
      <div class="login-form-container">
        <div class="login-header">
          <i class="fas fa-shopping-cart"></i>
          <h1>ShopList</h1>
          <p class="subtitle">{{ isLogin ? 'Entre na sua conta' : 'Crie sua conta' }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>
              <i class="fas fa-envelope"></i>
              Email
            </label>
            <input 
              type="email" 
              v-model="email" 
              required
              placeholder="Seu email"
            >
          </div>

          <div class="form-group">
            <label>
              <i class="fas fa-lock"></i>
              Senha
            </label>
            <input 
              type="password" 
              v-model="password" 
              required
              placeholder="Sua senha"
            >
          </div>

          <button type="submit" class="login-btn">
            <i class="fas" :class="isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'"></i>
            {{ isLogin ? 'Entrar' : 'Cadastrar' }}
          </button>
        </form>

        <div class="divider">
          <span>ou continue com</span>
        </div>

        <button @click="loginWithGoogle" class="google-btn">
          <img src="https://www.google.com/favicon.ico" alt="Google" class="google-icon">
          Google
        </button>

        <p class="toggle-text">
          {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
          <button @click="isLogin = !isLogin" class="toggle-btn">
            {{ isLogin ? 'Cadastre-se' : 'Faça login' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const isLogin = ref(true)

    const handleLogin = async () => {
      try {
        if (isLogin.value) {
          await signInWithEmailAndPassword(auth, email.value, password.value)
        } else {
          await createUserWithEmailAndPassword(auth, email.value, password.value)
        }
        router.push('/lista')
      } catch (error) {
        alert(error.message)
      }
    }

    const loginWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        router.push('/lista')
      } catch (error) {
        console.error('Erro no login com Google:', error)
        alert('Erro ao fazer login com Google. Tente novamente.')
      }
    }

    return {
      email,
      password,
      isLogin,
      handleLogin,
      loginWithGoogle
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 2rem;
}

.login-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-height: 550px;
}

.login-banner {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1578916171728-46686eac8d58');
  background-size: cover;
  background-position: center;
  min-height: unset;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(223, 109, 20, 0.8), rgba(193, 70, 0, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.banner-content {
  text-align: center;
  color: white;
}

.banner-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.banner-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.login-form-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-header i {
  font-size: 2rem;
  color: #DF6D14;
  margin-bottom: 0.5rem;
}

.login-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.form-group {
  width: 100%;
  margin-bottom: 1.25rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.form-group label i {
  color: #DF6D14;
}

.form-group input,
.login-btn,
.google-btn {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input {
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  display: block;
}

.form-group input:focus {
  border-color: #DF6D14;
  background: white;
  box-shadow: 0 0 0 4px rgba(223, 109, 20, 0.1);
}

.login-btn {
  background: linear-gradient(135deg, #DF6D14, #C14600);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(223, 109, 20, 0.3);
}

.divider {
  margin: 1.25rem 0;
  display: flex;
  align-items: center;
  text-align: center;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 2px solid #e2e8f0;
}

.divider span {
  padding: 0 1rem;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.google-btn {
  border: 2px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.google-btn:hover {
  background: #f8fafc;
  border-color: #DF6D14;
  transform: translateY(-2px);
}

.google-icon {
  width: 20px;
  height: 20px;
}

.toggle-text {
  text-align: center;
  margin-top: 1.25rem;
  color: #64748b;
}

.toggle-btn {
  background: none;
  border: none;
  color: #DF6D14;
  font-weight: 600;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  color: #C14600;
  text-decoration: underline;
}

/* Responsividade */
@media (max-width: 768px) {
  .login-content {
    min-height: unset;
    max-height: 90vh;
  }

  .login-form-container {
    padding: 1.5rem;
  }
}

@media (max-height: 700px) {
  .login-content {
    min-height: unset;
    max-height: 95vh;
  }

  .form-group {
    margin-bottom: 0.75rem;
  }

  .login-header {
    margin-bottom: 1rem;
  }
}
</style> 