import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { add } from 'date-fns';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

let authToken;
let customer;
let address;
let product;

describe('Rents Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('123456', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, whatsapp, role, created_at, updated_at)
        values('${id}', 'Daniel Lucas', 'daniellucas-pms@hotmail.com', '${password}', '12981025796', 'ADM', 'now()', 'now()')
      `,
    );

    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    authToken = authResponse.body.token;

    const customerResponse = await request(app)
      .post('/customers')
      .send({
        name: 'Douglas de Souza',
        whatsapp: '12981412064',
        cpf: '09638912601',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    customer = customerResponse.body;

    const addressResponse = await request(app)
      .post('/addresses')
      .send({
        customer_id: customer.id,
        description: 'Casa do Douglas de Souza',
        postal_code: '12565-350',
        city: 'Lorena',
        neighborhood: 'Vila Passos',
        street: 'Mario P de Aquino Filho',
        number: '529',
        address_type: 'Cobrança',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    address = addressResponse.body;

    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'Bolo normal',
        quantity: 4,
        value: 50,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    product = productResponse.body;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a rent', async () => {
    const response = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: add(new Date(), { days: 5 }),
        rental_items: [
          {
            product_id: product.id,
            quantity: 1,
            value: 50,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 50,
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('customer_id');
    expect(response.body).toHaveProperty('address_id');
    expect(response.body).toHaveProperty('payment_status');
    expect(response.body).toHaveProperty('payment_way');
    expect(response.body).toHaveProperty('total_value');
    expect(response.body).toHaveProperty('rent_date');
  });

  it('Should be able to show a rent', async () => {
    const rentResponse = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: add(new Date(), { days: 5 }),
        rental_items: [
          {
            product_id: product.id,
            quantity: 1,
            value: 50,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 50,
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    const rent = rentResponse.body;

    const response = await request(app)
      .get(`/rents/${rent.id}`)
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rent');
    expect(response.body.rent).toHaveProperty('customer');
    expect(response.body.rent).toHaveProperty('address');
    expect(response.body).toHaveProperty('rentedItems');
    expect(response.body.rentedItems[0]).toHaveProperty('product');
  });

  it('Should be able to list all rents', async () => {
    const rentResponse = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: add(new Date(), { days: 5 }),
        rental_items: [
          {
            product_id: product.id,
            quantity: 1,
            value: 50,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 50,
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    const rent = rentResponse.body;

    const response = await request(app)
      .get(`/rents`)
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
    expect(response.body[2]).toHaveProperty('id');
    expect(response.body[2].id).toBe(rent.id);
    expect(response.body[2]).toHaveProperty('customer');
  });

  it('Should be able to update a rent', async () => {
    const rentResponse = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: add(new Date(), { days: 5 }),
        rental_items: [
          {
            product_id: product.id,
            quantity: 1,
            value: 50,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 50,
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    const rent = rentResponse.body;

    const response = await request(app)
      .put(`/rents/${rent.id}`)
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: add(new Date(), { days: 5 }),
        rental_items: [
          {
            product_id: product.id,
            quantity: 1,
            value: 50,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 60,
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('customer');
    expect(response.body).toHaveProperty('address');
    expect(response.body).toHaveProperty('total_value');
    expect(response.body.total_value).toBe(60);
  });

  it('Should be able to delete a rent', async () => {
    const rentResponse = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: add(new Date(), { days: 5 }),
        rental_items: [
          {
            product_id: product.id,
            quantity: 1,
            value: 50,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 50,
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    const rent = rentResponse.body;

    const response = await request(app)
      .delete(`/rents/${rent.id}`)
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Rent deleted!');
  });
});
