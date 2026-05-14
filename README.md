# 🎨 Node Auth Frontend

Frontend desacoplado desenvolvido para consumir a Node Auth API, simulando fluxos reais de autenticação utilizados em aplicações modernas.

O projeto foi construído com foco em experiência do usuário, integração frontend/backend e arquitetura desacoplada.

---

## 📌 Sobre o projeto

Este frontend é responsável pela interface de autenticação da aplicação, realizando comunicação direta com a API através de requisições HTTP utilizando Axios.

A aplicação possui fluxos completos de:
- Cadastro
- Login
- Ativação de conta
- Reenvio de token
- Tratamento visual de erros
- Feedbacks dinâmicos via modal

---

## 🌐 Backend da aplicação

A API utilizada neste projeto pode ser acessada no repositório abaixo:

🔗 https://github.com/Zero-Absolut/node-auth-api

---

## 🚀 Funcionalidades

### ✅ Implementado

- Tela de cadastro
- Tela de login
- Fluxo de ativação de conta
- Reenvio de token de ativação
- Integração completa com API REST
- Validação visual de erros
- Modais dinâmicos com Bootstrap
- Redirecionamentos automáticos
- Tratamento de tokens via URL
- Integração com sessões autenticadas
- Layout moderno e responsivo
- Estrutura organizada por páginas e scripts

---

## 🚧 Em desenvolvimento

- Integração completa do fluxo 2FA no frontend
- Login social com Google
- Dashboard autenticada
- Melhorias de UX/UI
- Componentização do frontend
- Refatoração para arquitetura mais escalável
- Sistema de loading states
- Melhor tratamento visual de erros

---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Axios

---

## 🔗 Integração com API

O frontend consome uma API REST Node.js responsável pelos fluxos de autenticação.

Exemplo de integração:

```js
await axios.post(
  "http://localhost:8080/api/auth/login",
  data,
  {
    withCredentials: true,
  }
);
```

---

## ▶️ Como executar o projeto

Clone o repositório:

```bash
git clone git@github.com:Zero-Absolut/node-auth-frontend.git
```

Entre na pasta:

```bash
cd node-auth-frontend
```

Abra o projeto utilizando:
- Live Server
ou
- qualquer servidor local

---

## 📈 Objetivo do projeto

Este projeto faz parte do meu portfólio como desenvolvedor full stack e tem como objetivo demonstrar:
- Integração frontend/backend
- Consumo de APIs REST
- Fluxos reais de autenticação
- Manipulação de sessões
- Tratamento de estados de autenticação
- Arquitetura desacoplada

---

## 📌 Status

🚧 Em desenvolvimento contínuo

---

## 👨‍💻 Autor

Mateus Brito

🔗 https://github.com/Zero-Absolut
