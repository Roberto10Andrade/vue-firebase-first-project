# ShopList - Lista de Compras 🛒

Aplicação web para gerenciamento de lista de compras desenvolvida durante a disciplina de DESENVOLVIMENTO WEB III.

## 📸 Screenshots

### Tela de Login
![Tela de Login](screenshots/login.png)
*Tela de login com autenticação via email/senha e Google*

### Tela Principal
![Tela Principal](screenshots/main.png)
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
  - Tailwind CSS

- **Backend:**
  - Firebase Authentication
  - Cloud Firestore

- **Bibliotecas:**
  - jsPDF (exportação PDF)
  - XLSX (exportação Excel)

## 🚀 Como Usar

1. Clone o repositório
```bash
git clone https://github.com/Roberto10Andrade/vue-firebase-first-project-master.git
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

## 💡 Recursos Adicionais

- Design responsivo
- Interface intuitiva
- Feedback visual
- Validação de dados
- Proteção de rotas
- Persistência de dados

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👤 Autor

**Roberto Andrade**
- GitHub: [@Roberto10Andrade](https://github.com/Roberto10Andrade)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Professor e monitores da disciplina
- Comunidade Vue.js
- Documentação do Firebase

