# Sistema Ruth Pessoa bolos fakes e arranjos (back-end)
Back-end para sistema de gestão e locação de materiais.


## Autenticação

  **Antes de acessar qualquer rota da API é necessário estar autenticado.**

  Além disso, algumas rotas requerem permissões atreladas ao cargo do usuário.

  Cargos: **'ADM'** | **'OWNER'** | **'USER'**

  *Para realizar autenticação:

- Acesse a rota **`/sessions`** com email e senha válidos no corpo da requisição.

- A resposta retornada é o token JWT e informações do usuário.


## Rotas

- [Usuários](#usuários)
- [Produtos](#produtos)
- [Clientes](#clientes)
- [Endereços](#endereços)
- [Aluguéis](#aluguéis)


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

- **`GET`**: Lista todos os produtos em ordem alfabética.

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

**`/products/available`**

- **`GET`**: Retorna as informações dos produtos disponíveis em uma data específica.
> Recebe como corpo da resquisição a data desejada:

      {
        "date": "2021-02-13T03:00:00.000Z",
      }

### Clientes
  **`/customers`**

- **`POST`**: Cria um cliente.
  > Recebe como corpo da resquisição:

      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }

  > Retorna:

      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890",
        "id": "4bae1ed5-e4f8-4a7a-b1e4-bd93050ef50e",
        "created_at": "2021-02-01T21:28:48.096Z",
        "updated_at": "2021-02-01T21:28:48.096Z"
      }

- **`GET`**: Lista todos os clientes em ordem alfabética.

**`/customers/:id`**

- **`GET`**: Retorna as informações de um cliente específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um cliente específico.
  > Recebe como corpo da resquisição:

      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }

- **`DELETE`**: Deleta um cliente específico com base no ID recebido pela rota.

### Endereços
  **`/addresses`**

- **`POST`**: Cria um endereço.
  > Recebe como corpo da resquisição:

      {
        "customer_id": "4bae1ed5-e4f8-4a7a-b1e4-bd93050ef50e",
        "description": "John's house",
        "postal_code": "12345-678",
        "city": "Springfield",
        "neighborhood": "friendly neighborhood",
        "street": "friendly street",
        "number": "1234",
        "address_type": "Cobrança"
      }

    *a propriedade `customer_id` é opcional, um endereço não precisa estar relacionado a um usuário.

    *address_type: **'Cobrança'** | **'Salão'** | **'Entrega'** | **'Busca'** ("busca" só deve ser utlizado para o endereço da empresa/casa onde os clientes buscarão as mercadorias)


  > Retorna:

      {
        "description": "John's house",
        "postal_code": "12345-678",
        "city": "Springfield",
        "neighborhood": "friendly neighborhood",
        "street": "friendly street",
        "number": "1234",
        "address_type": "Cobrança"
        "id": "52fbac28-582d-411d-b420-82a6c0d8bc49",
        "created_at": "2021-02-01T19:41:50.165Z",
        "updated_at": "2021-02-01T19:41:50.165Z"
      }

- **`GET`**: Lista todos os endereços.
  > Essa rota pode receber no copo da requisição o tipo de endereço (`address_type`), para que sejam listados apenas endereços de um tipo específico.

      {
        "address_type": "Cobrança"
      }

**`/addresses/:id`**

- **`GET`**: Retorna as informações de um endereço específico com base no ID recebido pela rota.

- **`PUT`**: Atualiza as informações de um endereço específico.
  > Recebe como corpo da resquisição:

      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }

- **`DELETE`**: Deleta um endereço específico com base no ID recebido pela rota.

**`/addresses/customers/:id`**

- **`GET`**: Retorna as informações do endereço de um cliente específico com base no ID recebido pela rota.
  > Com base no id do usuário a seguinte resposta é retornada:

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
          "address_type": "Cobrança"
          "created_at": "2021-02-01T19:41:50.165Z",
          "updated_at": "2021-02-01T19:41:50.165Z"
        }
      }

### Aluguéis
  **`/rents`**

- **`POST`**: Cria um aluguel.
  > Recebe como corpo da resquisição:

      {
        "customer_id": "3db95a0a-28f7-477b-823f-8357f7600854",
        "address_id": "3af636fe-0410-4a7d-95a0-2d189318317d",
        "rent_date": "2021-02-14T00:26:57.197Z",
        "rental_items": [{
          "product_id": "b7dc845d-8a12-49a6-8383-efd0d07c21d8",
          "quantity": 1,
          "value": 50
        }],
        "payment_status": "Pendente",
        "payment_way": "Dinheiro",
        "total_value": 50
      }

    *payment_way: **'Dinheiro'** | **'Transferência'**;

    *payment_status: **'Pago'** | **'Pendente'** | **'Parcial'**;

  > Retorna:

      {
        "rent_date": "2021-02-14T00:26:57.197Z",
        "total_value": 50,
        "payment_way": "Dinheiro",
        "payment_status": "Pago",
        "customer_id": "3db95a0a-28f7-477b-823f-8357f7600854",
        "address_id": "3af636fe-0410-4a7d-95a0-2d189318317d",
        "id": "432156ce-544b-44a7-b286-53da34f47698",
        "created_at": "2021-02-08T19:13:54.533Z",
        "updated_at": "2021-02-08T19:13:54.533Z"
      }

- **`GET`**: Lista todos os aluguéis e as informações do cliente solicitante.

**`/rents/:id`**

- **`GET`**: Retorna todas as informações de um aluguel específico (com base no ID recebido pela rota) e todos seus relacionamentos.

- **`PUT`**: Atualiza as informações de um aluguel específico.
  > Recebe como corpo da resquisição:

      {
        "customer_id": "3db95a0a-28f7-477b-823f-8357f7600855",
        "address_id": "3af636fe-0410-4a7d-95a0-2d189318318d",
        "rent_date": "2021-02-14T00:26:57.197Z",
        "rental_items": [{
          "product_id": "b7dc845d-8a12-49a6-8383-efd0d07c21d9",
          "quantity": 1,
          "value": 50
        }],
        "payment_status": "Pago",
        "payment_way": "Dinheiro",
        "total_value": 60
      }

- **`DELETE`**: Deleta um aluguel específico com base no ID recebido pela rota.

**`/rents/week`**

- **`GET`**: Lista todos os aluguéis (e as informações do cliente solicitante) num período de 7 dias a partir da data especificada.
  > Recebe como corpo da resquisição a data desejada:

      {
        "date": "2021-02-13T03:00:00.000Z",
      }

**`/rents/products/:id`**

- **`GET`**: Lista todos os aluguéis que contenham o produto especificado.

**`/rents/customers/:id`**

- **`GET`**: Lista todos os aluguéis que pertencem a um cliente especificado.
