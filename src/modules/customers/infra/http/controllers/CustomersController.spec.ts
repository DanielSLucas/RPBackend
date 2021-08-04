import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Customers Controller', () => {
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

  it('Should be able to create a new customer', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Douglas de Souza',
        whatsapp: '12981412064',
        cpf: '09638912601',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('whatsapp');
    expect(response.body).toHaveProperty('cpf');
  });

  it('Should be able to show a customer', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const customerResponse = await request(app)
      .post('/customers')
      .send({
        name: 'Douglas de Souza',
        whatsapp: '12981412064',
        cpf: '09638912602',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = customerResponse.body;

    const response = await request(app)
      .get(`/customers/${customer.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('whatsapp');
    expect(response.body).toHaveProperty('cpf');
  });

  it('Should be able to list all customers', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const customerResponse = await request(app)
      .post('/customers')
      .send({
        name: 'Douglas de Souza',
        whatsapp: '12981412064',
        cpf: '09638912603',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = customerResponse.body;

    const response = await request(app)
      .get('/customers')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
    expect(response.body[2]).toHaveProperty('id');
    expect(response.body[2].id).toEqual(customer.id);
    expect(response.body[2]).toHaveProperty('name');
    expect(response.body[2].name).toEqual(customer.name);
    expect(response.body[2]).toHaveProperty('whatsapp');
    expect(response.body[2].whatsapp).toEqual(customer.whatsapp);
    expect(response.body[2]).toHaveProperty('cpf');
    expect(response.body[2].cpf).toEqual(customer.cpf);
  });

  it('Should be able to update a customer', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const customerResponse = await request(app)
      .post('/customers')
      .send({
        name: 'Douglas de Souza',
        whatsapp: '12981412064',
        cpf: '09638912604',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = customerResponse.body;

    const response = await request(app)
      .put(`/customers/${customer.id}`)
      .send({
        name: 'Douglas de Souza XP',
        whatsapp: '12981412064',
        cpf: '09638912600',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('whatsapp');
    expect(response.body).toHaveProperty('cpf');
    expect(response.body.cpf).toEqual('09638912600');
  });

  it('Should be able to delete a customer', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const customerResponse = await request(app)
      .post('/customers')
      .send({
        name: 'Douglas de Souza',
        whatsapp: '12981412064',
        cpf: '09638912605',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = customerResponse.body;

    const response = await request(app)
      .delete(`/customers/${customer.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Customer deleted!');
  });
});
