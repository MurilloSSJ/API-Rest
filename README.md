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
![image](https://user-images.githubusercontent.com/77257498/147416286-9e7d2c50-a72b-4d33-9222-c077020fe4b1.png)
##### UNAUTHORIZED 401
Caso você não esteja logado, ou esteja com e-mail ou login inválidos, você receberá esse status, com uma mensagem de erro.
![image](https://user-images.githubusercontent.com/77257498/147416297-9060bb55-a76c-490a-b808-65526c8aa02b.png)

### GET /games/:id
Este endpoint é responsável por retornar um game específico do banco de dados.
#### Parametros
- ID : ID do game que você quer retornar
#### Respostas
##### OK 200
Caso tudo ocorra como o esperado, você receberá o status 200, e uma lista com o game selecionado.
![image](https://user-images.githubusercontent.com/77257498/147416375-2475ad31-ce84-490d-b237-53a53c05d4d0.png)
##### BAD REQUEST 400
Se nenhum valor de id for passado como parametro, você receberá o status 400, com uma mensagem de erro.
![image](https://user-images.githubusercontent.com/77257498/147416461-b0bc7e8f-238f-4c4f-97d6-92a97e3d3afd.png)
##### UNAUTHORIZED 401
Caso você não esteja logado, ou esteja com e-mail ou login inválidos, você receberá esse status, com uma mensagem de erro.
![image](https://user-images.githubusercontent.com/77257498/147416297-9060bb55-a76c-490a-b808-65526c8aa02b.png)

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
![image](https://user-images.githubusercontent.com/77257498/147416696-2d40bf87-57e9-4a20-a92b-650d1f9f6a4d.png)
##### NOT FOUND 404
Caso o usuário não exista no banco de dados, será retornado o status 404.
##### BAD REQUEST 400
Caso ocorra algum erro na autenticação com o JWT, será enviado o status 400.
##### UNAUTHORIZED 401
Caso os dados estejam incorretos, será enviado o status 401
