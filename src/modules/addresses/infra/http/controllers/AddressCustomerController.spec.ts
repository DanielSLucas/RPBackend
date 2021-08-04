import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Address Customer Controller', () => {
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

  it('Should be able to show address from an specific customer', async () => {
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
        cpf: '09638912601',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = customerResponse.body;

    await request(app)
      .post('/addresses')
      .send({
        customer_id: customer.id,
        description: 'Casa do Douglas de Souza',
        postal_code: '12565-350',
        city: 'Lorena',
        neighborhood: 'Vila Passos',
        street: 'Mario P de Aquino Filho',
        number: '529',
        address_type: 'PERSONAL',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get(`/addresses/customers/${customer.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('address_id');
    expect(response.body).toHaveProperty('customer_id');
    expect(response.body).toHaveProperty('address');
    expect(response.body.address).toHaveProperty('id');
    expect(response.body.address).toHaveProperty('description');
    expect(response.body.address).toHaveProperty('postal_code');
    expect(response.body.address).toHaveProperty('city');
    expect(response.body.address).toHaveProperty('neighborhood');
    expect(response.body.address).toHaveProperty('street');
    expect(response.body.address).toHaveProperty('number');
    expect(response.body.address).toHaveProperty('address_type');
  });
});
