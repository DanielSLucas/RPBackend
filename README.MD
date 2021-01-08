# Sistema Ruth Pessoa bolos fakes e arranjos (back-end)
Back-end para sistema de gestão e locação de materiais.

### Rota de produtos
  **`/products`**
- [POST]: Cria um produto.
  > - Recebe como corpo da resquisição:

      "{
        "name": "Bolo Caro",
        "quantity": "20",
        "value": 2000,
        "product_type": "Bolos"
      }"

  > - Retorna:

      "{
        "name": "Bolo Caro",
        "quantity": "20",
        "value": 2000,
        "product_type": "Bolos",
        "id": "fec6998e-316d-4f86-9ef6-b1dc114f870c",
        "created_at": "2021-01-07T22:02:43.921Z",
        "updated_at": "2021-01-07T22:02:43.921Z"
      }"

