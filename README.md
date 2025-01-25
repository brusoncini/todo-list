# To-Do List

## 📝 Descrição do projeto

Esse aplicativo de lista de tarefas (“To-Do List”) foi desenvolvido para demonstrar o uso de tecnologias da AWS, como S3, API Gateway, CloudFront e Lambda. Para melhorar a usabilidade, foi implantado também um front-end estático simples.

Acesse clicando [aqui](https://d1caz3q4tsz4it.cloudfront.net/)!

## 🔧 Ferramentas e tecnologias

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: AWS Lambda (Python)
- **Infraestrutura**: AWS S3, API Gateway, CloudFront, DynamoDB
- **Gerenciamento de Banco de Dados**: DynamoDB
- **Deploy**: Amazon S3 e CloudFront

## 📌 Funcionalidades

- Interface simples para criar, listar e excluir tarefas.
- Backend serverless utilizando AWS Lambda.
- Banco de dados NoSQL (DynamoDB) para armazenar as tarefas.
- API RESTful implementada com API Gateway.
- Hospedagem segura do front-end no S3 com HTTPS fornecido pelo CloudFront.

## Endpoints 📌

### Base URL
```
https://rbwne74pyf.execute-api.sa-east-1.amazonaws.com/dev/tasks
```

### **GET /tasks**
- **Descrição**: Retorna todas as tarefas.
- **Exemplo de resposta**:
```json
[
  {
    "id": "1234567890",
    "name": "Estudar AWS Lambda",
    "completed": false
  }
]
```

### **POST /tasks**
- **Descrição**: Cria uma nova tarefa.
- **Corpo da requisição**:
```json
{
  "name": "Nova tarefa",
  "completed": false
}
```
- **Exemplo de resposta**:
```json
{
  "message": "Tarefa criada com sucesso",
  "id": "1234567890"
}
```

### **DELETE /tasks?id={id}**
- **Descrição**: Exclui uma tarefa pelo `id`.
- **Exemplo de resposta**:
```json
{
  "message": "Tarefa excluída com sucesso"
}
```

## Status Code ✅
- **200 OK**: A operação foi bem-sucedida.
- **201 Created**: Recurso criado com sucesso.
- **204 No Content**: Resposta à requisição OPTIONS (CORS).
- **400 Bad Request**: Dados da requisição inválidos.
- **404 Not Found**: Recurso não encontrado.
- **500 Internal Server Error**: Erro no servidor.

## 🚶 Acesso

Deploy disponível [aqui](https://d1caz3q4tsz4it.cloudfront.net/).

## 👩🏻‍💻 Feito por

Este projeto foi inspirado pelo modelo de front-end do tutorial: [Simple To-Do List JavaScript Project](https://codingartistweb.com/2021/02/simple-to-do-list-javscript-javascript-project/). Agradecimentos ao autor pela base visual!

Desenvolvido com ❤️ por [Bruna Soncini](www.linkedin.com/in/brunasoncini/).

