# ShopList - Lista de Compras 🛒

Aplicação web para gerenciamento de lista de compras desenvolvida durante a disciplina de DESENVOLVIMENTO WEB III.

## 📸 Screenshots

### Tela de Login
![image](https://github.com/user-attachments/assets/e60732ca-0d74-4aa2-886a-86d7f046ef3e)
*Tela de login com autenticação via email/senha e Google*

### Tela Principal
![image](https://github.com/user-attachments/assets/dac28ce6-6a6b-49fd-a8a7-96aae620667e)
*Interface principal com lista de compras e funcionalidades*

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com email/senha
- Login com Google
- Cadastro de novos usuários
- Logout

### 📝 Gerenciamento de Lista
- Adicionar novos itens
- Editar itens existentes
- Remover itens
- Marcar como comprado
- Categorização (Alimentos, Bebidas, Limpeza, etc.)

### 🔍 Filtros e Busca
- Busca por nome do item
- Filtro por categoria
- Filtro de itens pendentes
- Ordenação personalizada

### 📊 Relatórios e Estatísticas
- Total gasto
- Itens por categoria
- Status das compras
- Histórico completo

### 📤 Exportação e Compartilhamento
- Exportar para PDF
- Exportar para Excel
- Compartilhar via WhatsApp
- Enviar por email

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - Vue.js 3
  - Vue Router
  - Font Awesome

- **Backend:**
  - Firebase Authentication
  - Cloud Firestore

- **Bibliotecas:**
  - jsPDF (exportação PDF)
  - XLSX (exportação Excel)

## 🚀 Como Usar

1. Clone o repositório
```bash
git clone https://github.com/Roberto10Andrade/vue-firebase-first-project.git
```

2. Instale as dependências
```bash
cd vue-firebase-first-project-master
npm install
```

3. Configure o Firebase
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-auth-domain
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

4. Execute o projeto
```bash
npm run serve
```

5. Acesse no navegador
```
http://localhost:8080
```

## 👤 Autor

**Roberto Andrade**
- GitHub: [@Roberto10Andrade](https://github.com/Roberto10Andrade)


