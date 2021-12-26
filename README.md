# API Rest
 Esta API foi utilizada para a criação de uma API com os conceitos REST, ou seja, enviando status http, e todas as informações no formato JSON, com cabeçalho e com os métodos de acesso corretos. Na prática, essa API tem uma série de informações sobre games, como o titulo, a descrição, o ano de lançamento, dentre outros. Todas as informações foram salvas em um MYSQL local, e foram utilizados o Express com NodeJS para construir as rotas.
 
## Endpoints

### GET /games
Este endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK 200
Caso tudo ocorra como o esperado, você receberá o status 200 e a lista com todos os games
```
[
    {
        "id": 3,
        "title": "The Elder Scroll V: Skyrim",
        "year": 2011,
        "price": 39.99,
        "createdAt": "2021-11-21T21:35:07.000Z",
        "updatedAt": "2021-11-21T21:35:07.000Z"
    },
    {
        "id": 55,
        "title": "Resident Evil 5",
        "year": 2007,
        "price": 9.99,
        "createdAt": "2021-11-21T21:35:07.000Z",
        "updatedAt": "2021-11-21T23:30:23.000Z"
    },
    {
        "id": 102,
        "title": "CS-GO",
        "year": 2010,
        "price": 0,
        "createdAt": "2021-11-21T22:01:11.000Z",
        "updatedAt": "2021-11-21T22:09:34.000Z"
    }
]
```
##### UNAUTHORIZED 401
Caso você não esteja logado, ou esteja com e-mail ou login inválidos, você receberá esse status, com uma mensagem de erro.
```
{
    "err": "Token Invalido"
}
```

### GET /games/:id
Este endpoint é responsável por retornar um game específico do banco de dados.
#### Parametros
- ID : ID do game que você quer retornar
#### Respostas
##### OK 200
Caso tudo ocorra como o esperado, você receberá o status 200, e uma lista com o game selecionado.
```
[
    {
        "id": 3,
        "title": "The Elder Scroll V: Skyrim",
        "year": 2011,
        "price": 39.99,
        "createdAt": "2021-11-21T21:35:07.000Z",
        "updatedAt": "2021-11-21T21:35:07.000Z"
    }
]
```
##### BAD REQUEST 400
Se nenhum valor de id for passado como parametro, você receberá o status 400, com uma mensagem de erro.
```
{
    "err": "Nenhum valor de ID passado como parametro"
}
```

### POST /games
Endpoint para salvar um game no banco de dados.
#### Parametros
- Title: Titulo do game
- Year: Ano de lançamento do game
- Price: Preço do game
#### Respostas
##### OK 200
Caso tudo ocorra como o esperado, você receberá o status 200.
##### BAD REQUEST 200
Caso algum paramêtro não seja passado

### DELETE /games/:id
Endpoint para remover um game do banco de dados
#### Parametros
- ID: ID do game a ser removido
#### Respostas:
##### OK 200
Caso tudo ocorra bem, será retornado o status 200.
##### NOT FOUND 404
Caso o id não seja achado no banco de dados, será retornado o status 404.
##### BAD REQUEST 400
Caso não seja passado o id como parametro, será retornado o status 400.

### PUT /games/:id
Endpoint para atualizar as informações de um game no banco de dados.
#### Parametros
- ID: ID do game a ser atualizado
- Title || Year || Price: Informações do game a serem atualizadas.
#### Respostas
##### OK 200
Caso tudo ocorra bem, será retornado o status 200
##### NOT FOUND 404
Caso o id não seja achado no banco de dados, será retornado o status 404.
##### BAD REQUEST 400
Caso não seja passado o id como parametro, será retornado o status 400.

### POST /auth
Rota para autenticação do usuário
#### Parametros
- email: Email do usuário
- senha: senha do usuário
#### Respostas
##### OK 200
Se tudo ocorrer corretamente, o usuário recebera este status e o seu token jwt
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cmlsbG9zdG9yZUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjQwNTQxMzA1LCJleHAiOjE2NDA1ODQ1MDV9.EegunvlaVkcyejO22j70Fzpqt_HiO1V18KmA6BNDptI"
}
```
##### NOT FOUND 404
Caso o usuário não exista no banco de dados, será retornado o status 404.
##### BAD REQUEST 400
Caso ocorra algum erro na autenticação com o JWT, será enviado o status 400.
##### UNAUTHORIZED 401
Caso os dados estejam incorretos, será enviado o status 401
