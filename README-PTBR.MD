# Sistema para locação de materias (back-end)

Esse sistema tem o intuito de facilitar a gestão de uma empresa de locação de materiais para festas.

***O usuário desse sistema não será o cliente final (locador), mas sim o gestor e/ou funcionário responsável**
**pelo agendamento dos aluguéis.**

Dentre as funções:

- Estoque de produtos;
- Relação de clientes e endereços;
- Usuários com diferentes cargos;
- Listagem dos aluguéis.
- Criação de um aluguel:
  - O aluguel acontece em uma data específica, por tanto os produtos alugados só ficam indisponíveis no dia específicado.
  - O aluguel pertence a um cliente.
  - O aluguel pode conter um endereço de entrega, ou utilizar o mesmo endereço do cliente. Caso o contrário será
    considereado que os produtos serão buscados na empresa responsável pelo aluguel.
  - Com base na data recebida, os produtos disponíveis são listados com a quantidade disponível.
  - O produto possui um preço no momento em que é cadastrado no banco, porém o preço para um aluguel pode variar, então
    além da quantidade, é possivel definir o preço do produto na hora de adiciona-lo ao pedido.
  - O valor final, o status de pagamento e o método de pagamento também devem ser definidos na criação de um aluguel.

## Running project locally

**To run this project you should have nodejs and docker & docker-compose installed.**

```bash
  # Clone this project
  git clone https://github.com/DanielSLucas/RPBackend.git

  # Change to the project directory
  cd RPBackend

  # Install dependencies
  npm i
  # OR
  yarn

  # Run docker containers
  docker-compose up -d

  # Run dev script
  npm run dev:server
  # OR
  yarn dev:server

```

## Scripts

```bash
    # Creates the production version of the API, with all files converted from .ts to .js
    yarn build

    # To run the application localy
    yarn dev:server

    # To use typeorm CLI
    yarn typeorm

    # To create an ADM user in the database
    yarn seed:admin

    # To create the pickup address in the database
    yarn seed:address

    # To run all unit/integration tests and create coverage folder (databases should be runnin for this)
    yarn test
```

## Autenticação

  **Antes de acessar qualquer rota da API é necessário estar autenticado.**

  Além disso, algumas rotas requerem permissões atreladas ao cargo do usuário.

  Cargos: **'ADM'** | **'OWNER'** | **'USER'**

  *Para realizar autenticação:

- Acesse a rota **`/sessions`** com email e senha válidos no corpo da requisição.

- A resposta retornada é o token JWT e informações do usuário.

- Adicionar o token retornado aos headers das outras requisições dessa maneira:
```js
  // headers
  "Authorization": `Bearer ${tokenJWT}`
```

## Rotas

- [Login](#sessão)
- [Usuários](#usuários)
- [Produtos](#produtos)
- [Clientes](#clientes)
- [Endereços](#endereços)
- [Aluguéis](#aluguéis)

### Login
**`/sessions`**

- **`POST`**: Cria uma sessão.
  > Recebe como corpo da resquisição:
    ```json
      {
        "email": "daniellucas-pms@hotmail.com",
        "password": "123456"
      }
    ```
  > Retorna:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNIiwiaWF0IjoxNjI4ODc2NDMwLCJleHAiOjE2Mjg5NjI4MzAsInN1YiI6IjY4YWM3Yzg4LTNlYzUtNDNiMi1hNWU0LTI5Nzc3MTk3YmU2ZSJ9.DeJc7ZXLP7r263NB1ghzSRVyZows01WE-ggwBOIbCcE",
        "user": {
          "id": "68ac7c88-3ec5-43b2-a5e4-29777197be6e",
          "name": "Daniel Lucas",
          "email": "daniellucas-pms@hotmail.com",
          "whatsapp": "12981025796",
          "role": "ADM"
        }
      }
    ```

### Usuários
  **`/users`**

  ***A rota de usuário só pode ser acessada por um usuário com cargo de ADM**

- **`POST`**: Cria um usuário.
  > Recebe como corpo da resquisição:

  ```json
    {
      "name": "John Doe",
      "email": "johndoe@email.com",
      "password": "johnpass",
      "whatsapp": "12912345678",
      "role": "USER"
    }
  ```

  > Retorna:
  ```json
    {
      "id": "8db96658-1b72-4af2-a733-537d1e9b4f7e",
      "name": "John Doe",
      "email": "johndoe@email.com",
      "whatsapp": "12912345678",
      "role": "USER"
    }
  ```

- **`GET`**: Lista todos os usuários.

**`/users/:id`**

- **`GET`**: Retorna as informações de um usuário específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um usuário específico.
  > Recebe como corpo da resquisição:
    ```json
      {
        "name": "John Doe",
        "email": "johndoe@emai.com",
        "password": "johnpass",
        "whatsapp": "12345678901"
        "role": "user"
      }
    ```

- **`DELETE`**: Deleta um usuário específico com base no ID recebido pela rota.


### Produtos
  **`/products`**

- **`POST`**: Cria um produto.
  > Recebe como corpo da resquisição:
    ```json
      {
        "name": "Bolo Caro",
        "quantity": 20,
        "value": 2000,
        "product_type": "CAKES"
      }
    ```

  > Retorna:
    ```json
      {
        "name": "Bolo Caro",
        "quantity": 20,
        "value": 2000,
        "product_type": "CAKES",
        "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
        "created_at": "2021-01-07T22:02:43.921Z",
        "updated_at": "2021-01-07T22:02:43.921Z"
      }
    ```

- **`GET`**: Lista todos os produtos em ordem alfabética.

**`/products/:id`**

- **`GET`**: Retorna as informações de um produto específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um produto específico.
  > Recebe como corpo da resquisição:
    ```json
      {
        "name": "Bolo Caro",
        "quantity": 20,
        "value": 2000,
        "product_type": "CAKES"
      }
    ```
- **`DELETE`**: Deleta um produto específico com base no ID recebido pela rota.

**`/products/available`**

- **`GET`**: Retorna as informações dos produtos disponíveis em uma data específica.
  > Recebe como query param:
  ```
    date=2021-08-05T03:00:00.000Z
  ```

### Clientes
  **`/customers`**

- **`POST`**: Cria um cliente.
  > Recebe como corpo da resquisição:
    ```json
      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }
    ```
  > Retorna:
    ```json
      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890",
        "id": "4bae1ed5-e4f8-4a7a-b1e4-bd93050ef50e",
        "created_at": "2021-02-01T21:28:48.096Z",
        "updated_at": "2021-02-01T21:28:48.096Z"
      }
    ```
- **`GET`**: Lista todos os clientes em ordem alfabética.

**`/customers/:id`**

- **`GET`**: Retorna as informações de um cliente específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um cliente específico.
  > Recebe como corpo da resquisição:
    ```json
      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }
    ```
- **`DELETE`**: Deleta um cliente específico com base no ID recebido pela rota.

### Endereços
  **`/addresses`**

- **`POST`**: Cria um endereço.
  > Recebe como corpo da resquisição:
    ```json
      {
        "customer_id": "4bae1ed5-e4f8-4a7a-b1e4-bd93050ef50e",
        "description": "John's house",
        "postal_code": "12345-678",
        "city": "Springfield",
        "neighborhood": "friendly neighborhood",
        "street": "friendly street",
        "number": "1234",
        "address_type": "PERSONAL"
      }
    ```
    *a propriedade `customer_id` é opcional, um endereço não precisa estar relacionado a um usuário.

    *address_type: **'PERSONAL'** | **'PARTYROOM'** | **'DELIVERY'** | **'PICKUP'** ("PICKUP" só deve ser utlizado para o endereço da empresa/casa onde os clientes buscarão as mercadorias)


  > Retorna:
    ```json
      {
        "description": "John's house",
        "postal_code": "12345-678",
        "city": "Springfield",
        "neighborhood": "friendly neighborhood",
        "street": "friendly street",
        "number": "1234",
        "address_type": "PERSONAL",
        "id": "52fbac28-582d-411d-b420-82a6c0d8bc49",
        "created_at": "2021-02-01T19:41:50.165Z",
        "updated_at": "2021-02-01T19:41:50.165Z"
      }
    ```
- **`GET`**: Lista todos os endereços.
  > Essa rota pode receber como query param o tipo de endereço (`address_type`), para que sejam listados apenas endereços de um tipo específico.

  > Recebe como query param:
   ```
    type=PERSONAL or PARTYROOM or DELIVERY or PICKUP
  ```

**`/addresses/:id`**

- **`GET`**: Retorna as informações de um endereço específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um endereço específico.
  > Request:
    ```json
      {
        "customer_id": "4bae1ed5-e4f8-4a7a-b1e4-bd93050ef50e",
        "description": "John's house",
        "postal_code": "12345-678",
        "city": "Springfield",
        "neighborhood": "friendly neighborhood",
        "street": "friendly street",
        "number": "1234",
        "address_type": "PERSONAL"
      }
    ```
   > Response:
    ```json
      {
        "description": "John's house",
        "postal_code": "12345-678",
        "city": "Springfield",
        "neighborhood": "friendly neighborhood",
        "street": "friendly street",
        "number": "1234",
        "address_type": "PERSONAL",
        "id": "52fbac28-582d-411d-b420-82a6c0d8bc49",
        "created_at": "2021-02-01T19:41:50.165Z",
        "updated_at": "2021-02-01T19:41:50.165Z"
      }
    ```

- **`DELETE`**: Deleta um endereço específico com base no ID recebido pela rota.

**`/addresses/customers/:id`**

- **`GET`**: Retorna as informações do endereço de um cliente específico com base no ID recebido pela rota.
  > Com base no id do usuário a seguinte resposta é retornada:
    ```json
      {
        "id": "cc677afc-806f-45c0-ac3f-3b5b7e4dfff6",
        "address_id": "52fbac28-582d-411d-b420-82a6c0d8bc49",
        "customer_id": "4bae1ed5-e4f8-4a7a-b1e4-bd93050ef50e",
        "created_at": "2021-02-01T19:41:50.185Z",
        "updated_at": "2021-02-01T19:41:50.185Z",
        "address": {
          "id": "52fbac28-582d-411d-b420-82a6c0d8bc49",
          "description": "John's house",
          "postal_code": "12345-678",
          "city": "Springfield",
          "neighborhood": "friendly neighborhood",
          "street": "friendly street",
          "number": "1234",
          "address_type": "PERSONAL",
          "created_at": "2021-02-01T19:41:50.165Z",
          "updated_at": "2021-02-01T19:41:50.165Z"
        }
      }
    ```
### Aluguéis
  **`/rents`**

- **`POST`**: Cria um aluguel.
  > Recebe como corpo da resquisição:
    ```json
      {
        "customer_id": "3db95a0a-28f7-477b-823f-8357f7600854",
        "address_id": "3af636fe-0410-4a7d-95a0-2d189318317d",
        "rent_date": "2021-02-14T00:26:57.197Z",
        "rental_items": [{
          "product_id": "b7dc845d-8a12-49a6-8383-efd0d07c21d8",
          "quantity": 1,
          "value": 50
        }],
        "payment_status": "PENDING",
        "payment_way": "CASH",
        "total_value": 50
      }
    ```
    *payment_way: **'CASH'** | **'TRANSFER'** | **'PIX'**;

    *payment_status: **'PAID'** | **'PENDING'** | **'PARTIAL'**;

  > Retorna:
    ```json
      {
        "rent_date": "2021-02-14T00:26:57.197Z",
        "total_value": 50,
        "payment_way": "CASH",
        "payment_status": "PAID",
        "customer_id": "3db95a0a-28f7-477b-823f-8357f7600854",
        "address_id": "3af636fe-0410-4a7d-95a0-2d189318317d",
        "id": "432156ce-544b-44a7-b286-53da34f47698",
        "created_at": "2021-02-08T19:13:54.533Z",
        "updated_at": "2021-02-08T19:13:54.533Z"
      }
    ```
- **`GET`**: Lista todos os aluguéis e as informações do cliente solicitante.

**`/rents/:id`**

- **`GET`**: Retorna todas as informações de um aluguel específico (com base no ID recebido pela rota) e todos seus relacionamentos.

- **`PUT`**: Atualiza as informações de um aluguel específico.
  > Recebe como corpo da resquisição:
    ```json
      {
        "customer_id": "3db95a0a-28f7-477b-823f-8357f7600855",
        "address_id": "3af636fe-0410-4a7d-95a0-2d189318318d",
        "rent_date": "2021-02-14T00:26:57.197Z",
        "rental_items": [{
          "product_id": "b7dc845d-8a12-49a6-8383-efd0d07c21d9",
          "quantity": 1,
          "value": 50
        }],
        "payment_status": "PAID",
        "payment_way": "CASH",
        "total_value": 60
      }
    ```
- **`DELETE`**: Deleta um aluguel específico com base no ID recebido pela rota.

**`/rents/week`**

- **`GET`**: Lista todos os aluguéis (e as informações do cliente solicitante) num período de 7 dias a partir da data especificada.
  > Recebe como query param:
  ```
    date=2021-09-10T16:56:25.422Z
  ```

**`/rents/products/:id`**

- **`GET`**: Lista todos os aluguéis que contenham o produto especificado.

**`/rents/customers/:id`**

- **`GET`**: Lista todos os aluguéis que pertencem a um cliente especificado.
