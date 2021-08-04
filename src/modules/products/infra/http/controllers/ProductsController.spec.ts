import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Products Controller', () => {
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
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new product', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Bolo normal',
        quantity: '1',
        value: 50,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('quantity');
    expect(response.body).toHaveProperty('value');
    expect(response.body).toHaveProperty('product_type');
  });

  it('Should be able to show a product', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'Bolo normal',
        quantity: '1',
        value: 50,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = productResponse.body;

    const response = await request(app)
      .get(`/products/${product.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('quantity');
    expect(response.body).toHaveProperty('value');
    expect(response.body).toHaveProperty('product_type');
  });

  it('Should be able to list all products', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'Bolo normal',
        quantity: 1,
        value: 50,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = productResponse.body;

    const response = await request(app)
      .get('/products')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
    expect(response.body[2]).toHaveProperty('id');
    expect(response.body[2].id).toEqual(product.id);
    expect(response.body[2]).toHaveProperty('name');
    expect(response.body[2].name).toEqual(product.name);
    expect(response.body[2]).toHaveProperty('quantity');
    expect(response.body[2].quantity).toEqual(product.quantity);
    expect(response.body[2]).toHaveProperty('value');
    expect(response.body[2].value).toEqual(product.value);
    expect(response.body[2]).toHaveProperty('product_type');
    expect(response.body[2].product_type).toEqual(product.product_type);
  });

  it('Should be able to update a product', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'Bolo normal',
        quantity: '1',
        value: 50,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = productResponse.body;

    const response = await request(app)
      .put(`/products/${product.id}`)
      .send({
        name: 'Bolo normal',
        quantity: '1',
        value: 100,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('quantity');
    expect(response.body).toHaveProperty('value');
    expect(response.body).toHaveProperty('product_type');
    expect(response.body.value).toEqual(100);
  });

  it('Should be able to delete a product', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'Bolo normal',
        quantity: '1',
        value: 50,
        product_type: 'Bolos',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = productResponse.body;

    const response = await request(app)
      .delete(`/products/${product.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product deleted!');
  });
});
