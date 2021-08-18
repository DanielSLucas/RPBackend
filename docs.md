## Documentation

  **Before accessing any API route you must be authenticated.**

  Also, some routes require permissions tied to the user's role.

  Roles: **'ADM'** | **'OWNER'** | **'USER'**

  *To perform authentication:

- Access the **`/sessions`** route with a valid email and password in the request body.

- The returned response is the JWT token and user information.

- Add the returned token to the headers of other requests like this:
```js
   // headers
   "Authorization": `Bearer ${token}`
```

## Routes

- [Login](#login)
- [Users](#users)
- [Products](#products)
- [Customers](#customers)
- [Addresses](#addresses)
- [Rents](#rents)

### Login
**`/sessions`**

- **`POST`**: Creates a session.
  > Request:
    ```json
      {
        "email": "daniellucas-pms@hotmail.com",
        "password": "123456"
      }
    ```
  > Response:
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

### Users
  **`/users`**

  ***The user route can only be accessed by a user with ADM role.**

  *roles: **'ADM'** | **'OWNER'** | **'USER'**

- **`POST`**: Creates an user.
  > Request:
    ```json
      {
        "name": "John Doe",
        "email": "johndoe@email.com",
        "password": "johnpass",
        "whatsapp": "12912345678",
        "role": "USER"
      }
    ```

  > Response:
    ```json
      {
        "id": "8db96658-1b72-4af2-a733-537d1e9b4f7e",
        "name": "John Doe",
        "email": "johndoe@email.com",
        "whatsapp": "12912345678",
        "role": "USER"
      }
    ```

- **`GET`**: List all users.
> Response:
  ```json
    [
      {
        "id": "68ac7c88-3ec5-43b2-a5e4-29777197be6e",
        "name": "Daniel Lucas",
        "email": "daniellucas-pms@hotmail.com",
        "whatsapp": "12981025796",
        "role": "ADM"
      },
      ...
    ]
  ```

**`/users/:id`**

- **`GET`**: Returns information of a specific user based on the ID received in the route params.
  > Response:
  ```json
    {
      "id": "68ac7c88-3ec5-43b2-a5e4-29777197be6e",
      "name": "Daniel Lucas",
      "email": "daniellucas-pms@hotmail.com",
      "whatsapp": "12981025796",
      "role": "ADM"
    }
  ```

- **`PUT`**: Updates information of the specific user.
  > Request:
  ```json
      {
        "name": "John Doe",
        "email": "johndoe@emai.com",
        "password": "johnpass",
        "whatsapp": "12345678901",
        "role": "USER"
      }
  ```

  > Response:
  ```json
    {
      "id": "8db96658-1b72-4af2-a733-537d1e9b4f7e",
      "name": "John Doe",
      "email": "johndoe@email.com",
      "whatsapp": "12912345678",
      "role": "USER"
    }
  ```

- **`DELETE`**: Deletes a specific user based on ID received in the route params.
  > Response:
  ```json
    {
      "message": "User deleted!"
    }
  ```


### Products
  **`/products`**

- **`POST`**: Creates a product.
  > Request:
    ```json
      {
        "name": "Expensive cake",
        "quantity": 20,
        "value": 500,
        "product_type": "CAKES"
      }
    ```

  > Response:
    ```json
      {
        "name": "Expensive cake",
        "quantity": 20,
        "value": 500,
        "product_type": "CAKES",
        "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
        "created_at": "2021-01-07T22:02:43.921Z",
        "updated_at": "2021-01-07T22:02:43.921Z"
      }
    ```

- **`GET`**: Lists all products in alphabetic order.
> Response:
  ```json
    [
      {
        "name": "Expensive cake",
        "quantity": 20,
        "value": 500,
        "product_type": "CAKES",
        "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
        "created_at": "2021-01-07T22:02:43.921Z",
        "updated_at": "2021-01-07T22:02:43.921Z"
      },
      ...
    ]
  ```

**`/products/:id`**

- **`GET`**: Returns information of a specific product based on the ID received in the route params.
  > Response:
  ```json
    {
      "name": "Expensive cake",
      "quantity": 20,
      "value": 500,
      "product_type": "CAKES",
      "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
      "created_at": "2021-01-07T22:02:43.921Z",
      "updated_at": "2021-01-07T22:02:43.921Z"
    }
  ```

- **`PUT`**: Updates information of a specific product.
   > Request:
    ```json
      {
        "name": "Expensive cake",
        "quantity": 20,
        "value": 500,
        "product_type": "CAKES"
      }
    ```

  > Response:
    ```json
      {
        "name": "Expensive cake",
        "quantity": 20,
        "value": 500,
        "product_type": "CAKES",
        "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
        "created_at": "2021-01-07T22:02:43.921Z",
        "updated_at": "2021-01-07T22:02:43.921Z"
      }
    ```

- **`DELETE`**: Deletes a specific product based on the ID received in the route params.
  > Response:
  ```json
    {
      "message": "Product deleted!"
    }
  ```

**`/products/available`**

- **`GET`**: Returns all available products in a specific date.
  > Receives as query param:
  ```
    date=2021-08-05T03:00:00.000Z
  ```

### Customers
  **`/customers`**

- **`POST`**: Creates a customer.
  > Request:
    ```json
      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }
    ```
  > Response:
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

- **`GET`**: Lists all customers in alphabetic order.
> Response:
  ```json
    [
        {
          "id": "beb2f24c-a00b-4cf3-b680-90f40323ae89",
          "name": "Douglas de Souza",
          "whatsapp": "12981412064",
          "cpf": "09638912601",
          "created_at": "2021-08-03T21:04:18.365Z",
          "updated_at": "2021-08-03T21:04:18.365Z"
        },
      ...
    ]
  ```

**`/customers/:id`**

- **`GET`**: Returns information of a specific customer based on the ID received in the route params.
  > Response:
  ```json
    {
      "id": "613feb26-2b04-428f-8fbb-f2529cc13931",
      "name": "Douglas de Souza",
      "whatsapp": "12981412064",
      "cpf": "09638912603",
      "created_at": "2021-08-04T16:39:20.720Z",
      "updated_at": "2021-08-04T16:39:20.720Z"
    }
  ```

- **`PUT`**: Updates information of a specific customer.
   > Request:
    ```json
      {
        "name": "John Doe",
        "whatsapp": "12345678901",
        "cpf": "01234567890"
      }
    ```
  > Response:
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

- **`DELETE`**: Deletes a specific customer based on the ID received in the route params.
  > Response:
  ```json
    {
      "message": "Customer deleted!"
    }
  ```

### Addresses
  **`/addresses`**

  *The property `customer_id` is optional, an address doesn't need to be related to an customer.

  *`address_type`: **'PERSONAL'** | **'PARTYROOM'** | **'DELIVERY'** | **'PICKUP'** ("PICKUP" should only be used to the company address, where people go to pick up the materials)

- **`POST`**: Creates an address.
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



- **`GET`**: Lists all addresses.

  You can filter by address_type using query params:
  ```
    type=PERSONAL or PARTYROOM or DELIVERY or PICKUP
  ```

  > Response:
    ```json
      [
          {
            "id": "df290f5a-b16d-4716-ac43-0ac88f0c314e",
            "description": "Casa do Douglas de Souza",
            "postal_code": "12605-390",
            "city": "Lorena",
            "neighborhood": "Vila Passos",
            "street": "Mario P de Aquino Filho",
            "number": "529",
            "address_type": "PERSONAL",
            "created_at": "2021-08-14T18:06:03.220Z",
            "updated_at": "2021-08-14T18:06:03.220Z"
          },
        ...
      ]
    ```

**`/addresses/:id`**

- **`GET`**: Returns information of a specific address based on the ID received in the route params.
  > Response:
  ```json
    {
      "id": "981cc90a-ca16-4038-81d0-29862077dd9d",
      "description": "Casa do Douglas de Souza",
      "postal_code": "12605-390",
      "city": "Lorena",
      "neighborhood": "Vila Passos",
      "street": "Mario P de Aquino Filho",
      "number": "529",
      "address_type": "PERSONAL",
      "created_at": "2021-01-28T20:51:54.552Z",
      "updated_at": "2021-01-28T20:51:54.552Z"
    }
  ```

- **`PUT`**: Updates information of a specific address.
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

**`/addresses/:id`**
- **`DELETE`**: Deletes a specific address based on the ID received in the route params.
  > Response:
  ```json
    {
      "message": "Address deleted!"
    }
  ```

**`/addresses/customers/:id`**

- **`GET`**: Returns the address information for a specific customer based on the ID received by route params.
   > Response:
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

### Rents
  **`/rents`**

  *`payment_way`: **'CASH'** | **'TRANSFER'** | **'PIX'**;

  *`payment_status`: **'PAID'** | **'PENDING'** | **'PARTIAL'**;

- **`POST`**: Creates a rent.
  > Request:
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

  > Response:
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

- **`GET`**: Lists all rents with customer info.
  > Response:
    ```json
      [
        {
          "id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
          "rent_date": "2021-09-13T03:00:00.000Z",
          "total_value": 50,
          "payment_way": "CASH",
          "payment_status": "PAID",
          "customer_id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
          "address_id": "a283309e-ef41-4f28-a13f-441e284f7932",
          "created_at": "2021-08-14T18:37:14.291Z",
          "updated_at": "2021-08-14T18:37:14.291Z",
          "customer": {
            "id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
            "name": "Douglas de Souza",
            "whatsapp": "12981412064",
            "cpf": "09638912603",
            "created_at": "2021-08-14T18:05:51.411Z",
            "updated_at": "2021-08-14T18:05:51.411Z"
          }
        },
        ...
      ]
    ```

**`/rents/:id`**

- **`GET`**: Returns information of a specific rent and its relations, based on the ID received in the route params.
  > Response:
    ```json
      {
        "rent": {
          "id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
          "rent_date": "2021-09-13T03:00:00.000Z",
          "total_value": 50,
          "payment_way": "CASH",
          "payment_status": "PAID",
          "customer_id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
          "address_id": "a283309e-ef41-4f28-a13f-441e284f7932",
          "created_at": "2021-08-14T18:37:14.291Z",
          "updated_at": "2021-08-14T18:37:14.291Z",
          "customer": {
            "id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
            "name": "Douglas de Souza",
            "whatsapp": "12981412064",
            "cpf": "09638912603",
            "created_at": "2021-08-14T18:05:51.411Z",
            "updated_at": "2021-08-14T18:05:51.411Z"
          },
          "address": {
            "id": "a283309e-ef41-4f28-a13f-441e284f7932",
            "description": "Sede ruth pessoa bolos e arranjos",
            "postal_code": "12521130",
            "city": "Guaratinguetá",
            "neighborhood": "Engenheiro Neiva",
            "street": "Basf",
            "number": "955",
            "address_type": "PICKUP",
            "created_at": "2021-08-13T17:43:27.686Z",
            "updated_at": "2021-08-13T17:43:27.686Z"
          }
        },
        "rentedItems": [
          {
            "id": "b8614ccc-dc70-400c-84bc-b20e38b9a6d0",
            "quantity": 1,
            "value": 50,
            "product_id": "5c2287bd-a3a5-415e-b3fa-1bc0cc009c7e",
            "rent_id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
            "created_at": "2021-08-14T18:37:14.299Z",
            "updated_at": "2021-08-14T18:37:14.299Z",
            "product": {
              "id": "5c2287bd-a3a5-415e-b3fa-1bc0cc009c7e",
              "name": "Bolo normal",
              "quantity": 1,
              "value": 50,
              "product_type": "CAKES",
              "created_at": "2021-08-14T18:28:23.270Z",
              "updated_at": "2021-08-14T18:28:23.270Z"
            }
          }
        ]
      }
    ```

- **`PUT`**: Updates information of a specific rent.
  > Request:
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

  > Response:
    ```json
      {
        "id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
        "rent_date": "2021-09-14T00:26:57.197Z",
        "total_value": 50,
        "payment_way": "CASH",
        "payment_status": "PAID",
        "customer_id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
        "address_id": "a283309e-ef41-4f28-a13f-441e284f7932",
        "created_at": "2021-08-14T18:37:14.291Z",
        "updated_at": "2021-08-14T18:42:18.492Z",
        "customer": {
          "id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
          "name": "Douglas de Souza",
          "whatsapp": "12981412064",
          "cpf": "09638912603",
          "created_at": "2021-08-14T18:05:51.411Z",
          "updated_at": "2021-08-14T18:05:51.411Z"
        },
        "address": {
          "id": "a283309e-ef41-4f28-a13f-441e284f7932",
          "description": "Sede ruth pessoa bolos e arranjos",
          "postal_code": "12521130",
          "city": "Guaratinguetá",
          "neighborhood": "Engenheiro Neiva",
          "street": "Basf",
          "number": "955",
          "address_type": "PICKUP",
          "created_at": "2021-08-13T17:43:27.686Z",
          "updated_at": "2021-08-13T17:43:27.686Z"
        }
      }
    ```

**`/rents/:id`**
- **`DELETE`**: Deletes a specific rent based on the ID received in the route params.
  > Response:
  ```json
    {
      "message": "Rent deleted!"
    }
  ```

**`/rents/week`**

- **`GET`**: Lists all rents (and customer information) within 7 days from the specified date.
   > Receive as a param query:
   ```
     date=2021-09-10T16:56:25.422Z
   ```
   > Response:
   ```json
     [
        {
          "id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
          "rent_date": "2021-09-13T03:00:00.000Z",
          "total_value": 50,
          "payment_way": "CASH",
          "payment_status": "PAID",
          "customer_id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
          "address_id": "a283309e-ef41-4f28-a13f-441e284f7932",
          "created_at": "2021-08-14T18:37:14.291Z",
          "updated_at": "2021-08-14T18:42:18.492Z",
          "customer": {
            "id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
            "name": "Douglas de Souza",
            "whatsapp": "12981412064",
            "cpf": "09638912603",
            "created_at": "2021-08-14T18:05:51.411Z",
            "updated_at": "2021-08-14T18:05:51.411Z"
          }
        },
       ...
      ]
   ```

**`/rents/products/:id`**

- **`GET`**: List all rents that contains the specified product.
 > Response:
 ```json
    [
      {
        "id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
        "rent_date": "2021-09-13T03:00:00.000Z",
        "total_value": 50,
        "payment_way": "CASH",
        "payment_status": "PAID",
        "customer_id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
        "address_id": "a283309e-ef41-4f28-a13f-441e284f7932",
        "created_at": "2021-08-14T18:37:14.291Z",
        "updated_at": "2021-08-14T18:42:18.492Z"
      }
    ]
  ```

**`/rents/customers/:id`**

- **`GET`**: List all rents that belongs to the specified customer.
  > Response:
  ```json
    [
      {
        "id": "cb20bec9-a6d1-4b6e-bf03-67408735ee57",
        "rent_date": "2021-09-13T03:00:00.000Z",
        "total_value": 50,
        "payment_way": "CASH",
        "payment_status": "PAID",
        "customer_id": "4f0780dc-0dba-4b9d-919e-459673f3e117",
        "address_id": "a283309e-ef41-4f28-a13f-441e284f7932",
        "created_at": "2021-08-14T18:37:14.291Z",
        "updated_at": "2021-08-14T18:42:18.492Z"
      },
      ...
    ]
  ```
