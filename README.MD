# Sistema Ruth Pessoa bolos fakes e arranjos (back-end)
Back-end para sistema de gestão e locação de materiais.


## Autenticação

  **Antes de acessar qualquer rota da API é necessário estar autenticado.**

  Além disso, algumas rotas requerem permissões atreladas ao cargo do usuário.

  Cargos: 'ADM' | 'OWNER' | 'USER'

  *Para realizar autenticação:
  >  -  Acesse a rota **`/sessions`** com email e senha válidos no corpo da requisição.
  >  -  A resposta retornada é o token JWT e informações do usuário.


## Rotas

### Usuários
  **`/users`**

  ***A rota de usuário só pode ser acessada por um usuário com cargo de ADM**

- **`POST`**: Cria um usuário.
  > Recebe como corpo da resquisição:

      {
        "name": "John Doe",
        "email": "johndoe@emai.com",
        "password": "johnpass",
        "whatsapp": "12345678901"
        "role": "user"
      }

  > Retorna:

      {
        "name": "Lucas",
        "email": "lucas-pms@hotmail.com",
        "whatsapp": "12981025796",
        "id": "54061932-dbd1-4488-9b2e-ba10469464a4",
        "created_at": "2021-02-01T22:41:43.691Z",
        "updated_at": "2021-02-01T22:41:43.691Z"
      }

- **`GET`**: Lista todos os usuários.

**`/users/:id`**

- **`GET`**: Retorna as informações de um usuário específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um usuário específico.
  > Recebe como corpo da resquisição:

      {
        "name": "John Doe",
        "email": "johndoe@emai.com",
        "password": "johnpass",
        "whatsapp": "12345678901"
        "role": "user"
      }

- **`DELETE`**: Deleta um usuário específico com base no ID recebido pela rota.


### Produtos
  **`/products`**

- **`POST`**: Cria um produto.
  > Recebe como corpo da resquisição:

      {
        "name": "Bolo Caro",
        "quantity": 20,
        "value": 2000,
        "product_type": "Bolos"
      }

  > Retorna:

      {
        "name": "Bolo Caro",
        "quantity": 20,
        "value": 2000,
        "product_type": "Bolos",
        "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
        "created_at": "2021-01-07T22:02:43.921Z",
        "updated_at": "2021-01-07T22:02:43.921Z"
      }

- **`GET`**: Lista todos os produtos.

**`/products/:id`**

- **`GET`**: Retorna as informações de um produto específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um produto específico.
  > Recebe como corpo da resquisição:

      {
        "name": "Bolo Caro",
        "quantity": 20,
        "value": 2000,
        "product_type": "Bolos"
      }

- **`DELETE`**: Deleta um produto específico com base no ID recebido pela rota.
