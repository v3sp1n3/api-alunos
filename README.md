# API de Alunos

API REST desenvolvida com Node.js, Express e Prisma para gerenciamento de alunos.

O projeto foi desenvolvido como parte da atividade de avaliação da disciplina, aplicando conceitos de criação de APIs REST, separação em camadas, acesso a banco de dados com Prisma, tratamento de exceções personalizadas, paginação, ordenação e operações CRUD.

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- JavaScript
- Nodemon

## Estrutura do projeto

```text
api-alunos/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   └── AlunoController.js
│   │
│   ├── errors/
│   │   ├── ApiError.js
│   │   ├── AlunoInvalidoError.js
│   │   ├── AlunoNaoEncontradoError.js
│   │   └── EmailDuplicadoError.js
│   │
│   ├── routes/
│   │   └── alunoRoutes.js
│   │
│   ├── services/
│   │   └── AlunoService.js
│   │
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

## Arquitetura

O projeto utiliza separação de responsabilidades em camadas.

### Routes

Responsável por definir os endpoints disponíveis na API e direcionar as requisições para o Controller.

### Controller

Responsável por receber as requisições HTTP, obter parâmetros, query strings e dados do corpo da requisição.

Também realiza o tratamento das exceções lançadas pelo Service utilizando `try...catch` e retorna o status HTTP correspondente.

### Service

Responsável pelas regras de negócio, validações e comunicação com o Prisma.

É nessa camada que são realizadas operações como:

- Cadastro de alunos;
- Busca de alunos;
- Paginação;
- Ordenação;
- Atualização;
- Exclusão;
- Validação de dados;
- Verificação de aluno inexistente;
- Tratamento de email duplicado.

### Prisma

Utilizado para comunicação com o banco de dados SQLite e realização das operações de persistência.

---

# Funcionalidades

A API possui as seguintes funcionalidades:

- Cadastro de aluno;
- Listagem de alunos;
- Paginação;
- Ordenação dinâmica;
- Contagem total de registros;
- Busca de aluno por ID;
- Atualização parcial dos dados;
- Exclusão de aluno;
- Tratamento de aluno inexistente;
- Validação de dados;
- Tratamento de email duplicado.

---

# Requisitos implementados

## Requisito 1 - Ordenação e contagem

A rota:

```http
GET /alunos
```

permite paginação e ordenação utilizando parâmetros de query string.

Parâmetros disponíveis:

| Parâmetro | Descrição | Padrão |
|---|---|---|
| `page` | Página desejada | `1` |
| `pageSize` | Quantidade de registros por página | `10` |
| `orderBy` | Campo utilizado para ordenação | `id` |
| `order` | Direção da ordenação (`asc` ou `desc`) | `asc` |

Exemplo:

```http
GET /alunos?page=1&pageSize=5&orderBy=nome&order=asc
```

Exemplo de resposta:

```json
{
    "alunos": [
        {
            "id": 1,
            "nome": "Joao Silva",
            "email": "joao@email.com",
            "createdAt": "2026-09-26T14:14:57.487Z"
        }
    ],
    "total": 1
}
```

O campo `total` representa a quantidade total de alunos cadastrados no banco, independentemente da paginação.

---

## Requisito 2 - Busca por ID

Foi implementada a rota:

```http
GET /alunos/:id
```

Exemplo:

```http
GET /alunos/1
```

Caso o aluno exista:

```json
{
    "id": 1,
    "nome": "Joao Silva",
    "email": "joao@email.com",
    "createdAt": "2026-09-26T14:14:57.487Z"
}
```

Status:

```text
200 OK
```

Caso o aluno não exista:

```json
{
    "message": "Aluno não encontrado"
}
```

Status:

```text
404 Not Found
```

Para esse tratamento foi criada a exceção personalizada:

```text
AlunoNaoEncontradoError
```

---

## Requisito 3 - Atualização de aluno

Foi implementada a rota:

```http
PUT /alunos/:id
```

A atualização permite alterar:

- Somente o nome;
- Somente o email;
- Nome e email.

### Atualizando somente o nome

```json
{
    "nome": "Joao Silva Atualizado"
}
```

### Atualizando somente o email

```json
{
    "email": "joao.novo@email.com"
}
```

### Atualizando os dois campos

```json
{
    "nome": "Joao Silva Atualizado",
    "email": "joao.novo@email.com"
}
```

A API também trata os seguintes erros:

### Aluno inexistente

```json
{
    "message": "Aluno não encontrado"
}
```

### Corpo sem campos válidos

Uma requisição como:

```json
{}
```

é rejeitada pela aplicação.

### Email duplicado

O campo `email` possui restrição de unicidade.

Caso seja realizada uma tentativa de atribuir a um aluno um email já utilizado por outro:

```json
{
    "message": "Email já cadastrado"
}
```

A aplicação trata a violação de unicidade e retorna uma mensagem adequada ao cliente.

---

## Requisito 4 - Exclusão de aluno

Foi implementada a rota:

```http
DELETE /alunos/:id
```

Exemplo:

```http
DELETE /alunos/3
```

Quando o aluno é removido corretamente, a API retorna:

```text
204 No Content
```

Nenhum corpo é enviado na resposta.

Caso o aluno não exista:

```json
{
    "message": "Aluno não encontrado"
}
```

com status:

```text
404 Not Found
```

---

# Resumo dos endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/alunos` | Cadastra um aluno |
| GET | `/alunos` | Lista alunos com paginação e ordenação |
| GET | `/alunos/:id` | Busca um aluno pelo ID |
| PUT | `/alunos/:id` | Atualiza nome e/ou email |
| DELETE | `/alunos/:id` | Remove um aluno |

---

# Tratamento de erros

O projeto utiliza exceções personalizadas para separar as regras de negócio do tratamento HTTP.

Exceções utilizadas:

```text
ApiError
AlunoInvalidoError
AlunoNaoEncontradoError
EmailDuplicadoError
```

A classe `ApiError` funciona como classe base para as exceções personalizadas.

O Service identifica situações de erro e lança a exceção correspondente.

O Controller captura essas exceções utilizando:

```javascript
try {
    // chamada ao Service
} catch (e) {
    return response.status(e.statusCode || 500).json({
        message: e.message
    });
}
```

Dessa forma, as regras de negócio permanecem no Service enquanto o Controller fica responsável pela resposta HTTP.

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/v3sp1n3/api-alunos.git
```

Entre na pasta:

```bash
cd api-alunos
```

## 2. Instalar as dependências

```bash
npm install
```

## 3. Preparar o Prisma

Gerar o Prisma Client:

```bash
npx prisma generate
```

Aplicar as migrations:

```bash
npx prisma migrate dev
```

## 4. Executar a aplicação

Durante o desenvolvimento:

```bash
npm run dev
```

Ou:

```bash
npm start
```

O servidor será iniciado em:

```text
http://localhost:3000
```

---

# Exemplos de testes

Os endpoints podem ser testados utilizando Postman, Insomnia, Thunder Client ou PowerShell.

## Criar aluno

```powershell
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3000/alunos" `
  -ContentType "application/json" `
  -Body '{"nome":"Joao Silva","email":"joao@email.com"}'
```

## Listar alunos

```powershell
Invoke-RestMethod -Method Get `
  -Uri "http://localhost:3000/alunos"
```

## Listar com paginação e ordenação

```powershell
Invoke-RestMethod -Method Get `
  -Uri "http://localhost:3000/alunos?page=1&pageSize=5&orderBy=nome&order=asc"
```

## Buscar por ID

```powershell
Invoke-RestMethod -Method Get `
  -Uri "http://localhost:3000/alunos/1"
```

## Atualizar somente o nome

```powershell
Invoke-RestMethod -Method Put `
  -Uri "http://localhost:3000/alunos/1" `
  -ContentType "application/json" `
  -Body '{"nome":"Joao Silva Atualizado"}'
```

## Atualizar somente o email

```powershell
Invoke-RestMethod -Method Put `
  -Uri "http://localhost:3000/alunos/1" `
  -ContentType "application/json" `
  -Body '{"email":"joao.novo@email.com"}'
```

## Excluir aluno

```powershell
Invoke-RestMethod -Method Delete `
  -Uri "http://localhost:3000/alunos/1"
```

---

# Testes realizados

Durante o desenvolvimento foram testados casos de sucesso e erro para os endpoints implementados.

Entre os cenários verificados:

- Ordenação crescente;
- Ordenação decrescente;
- Paginação;
- Contagem total de alunos;
- Busca de aluno existente;
- Busca de aluno inexistente;
- Atualização somente do nome;
- Atualização somente do email;
- Atualização com corpo vazio;
- Atualização de aluno inexistente;
- Atualização utilizando email duplicado;
- Exclusão de aluno existente;
- Exclusão de aluno inexistente.

---

# Organização dos commits

O desenvolvimento foi dividido em commits específicos para cada requisito da atividade.

Exemplos:

```text
feat: adiciona ordenacao e contagem total no findMany de alunos
feat: adiciona busca de aluno por id
feat: adiciona atualização de alunos
feat: adiciona exclusao de alunos
fix: completa tratamento de erros no update de alunos
```

Essa organização permite acompanhar individualmente a implementação de cada requisito.

---

# Status do projeto

- [x] Paginação
- [x] Ordenação
- [x] Contagem total
- [x] Busca por ID
- [x] Tratamento de aluno inexistente
- [x] Atualização de aluno
- [x] Atualização parcial de nome/email
- [x] Tratamento de dados inválidos
- [x] Tratamento de email duplicado
- [x] Exclusão de aluno
- [x] Tratamento de erros com exceções personalizadas
- [x] Separação em Service, Controller e Routes
- [x] Testes de sucesso e erro
- [x] Commits separados por requisito

---

## Autor

**Nycolas Guilherme Nunes da Silva**

Projeto desenvolvido para fins acadêmicos.
