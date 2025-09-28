# 🏢 Tiger Accounting - Projetos 1

## 📌 Sobre o Projeto

O **Tiger Accounting** é um sistema desenvolvido para facilitar o gerenciamento financeiro e contábil de empresas e profissionais da área, oferecendo informações, serviços e uma interface moderna.

Este projeto do grupo **Projetos 1** tem como objetivo aplicar boas práticas de desenvolvimento web, com foco em responsividade e usabilidade.

## 🚀 Tecnologias Utilizadas

* **Frontend:** HTML, CSS e JavaScript → Estrutura, estilização responsiva e interatividade.
* **Backend:** Python (FastAPI) → API para integração e persistência de dados.
* **Node.js:** Configuração do ambiente frontend e execução de scripts.
* **Banco de Dados:** SQLAlchemy → Armazenamento das informações de login.

## 👥 Equipe de Desenvolvimento

Este projeto foi criado pelo grupo **Projetos 1**, composto pelos integrantes:

* Kennyson Chaves Florencio
* Luke Malquias Lage
* Miguel dos Santos Silva
* Rafael Lucas do Nascimento Sales

## 📄 Funcionalidades

✔️ Página inicial com informações institucionais da empresa
✔️ Seção de serviços contábeis oferecidos
✔️ Formulário de contato para atendimento
✔️ Dashboard protegido (após login)
✔️ Layout totalmente responsivo para diferentes dispositivos

## 📂 Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/MiguelSant7/TigerAccounting.git
cd TigerAccounting
```

### 2. Instalar Dependências do Frontend

```bash
cd frontend
npm install
```

### 3. Configurar e Rodar o Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/MacOS
.venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

O backend estará disponível em: `http://localhost:8000`

### 4. Iniciar o Frontend (React)

Em um novo terminal, na pasta `frontend/`:

```bash
npm start
```

O frontend estará disponível em: `http://localhost:3000`

### 5. Banco de Dados (MySQL)

Certifique-se de ter o MySQL rodando e crie o banco de dados:

```sql
CREATE DATABASE tiger_accounting;
```

Atualize a string de conexão no arquivo `backend/database.py` com suas credenciais.

## 📬 Contato

Para dúvidas ou sugestões, entre em contato com a equipe pelo GitHub ou por e-mail.

📌 **Tiger Accounting - Simplificando sua Contabilidade!**
