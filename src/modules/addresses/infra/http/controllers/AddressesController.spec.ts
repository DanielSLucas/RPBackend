import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Addresses Controller', () => {
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

  it('Should be able to create an address for an customer', async () => {
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

    const response = await request(app)
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

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('postal_code');
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('neighborhood');
    expect(response.body).toHaveProperty('street');
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('address_type');
  });

  it('Should be able to show an address', async () => {
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
        address_type: 'PERSONAL',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const address = addressResponse.body;

    const response = await request(app)
      .get(`/addresses/${address.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('postal_code');
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('neighborhood');
    expect(response.body).toHaveProperty('street');
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('address_type');
  });

  it('Should be able to list all addresses', async () => {
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
        address_type: 'PERSONAL',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const address = addressResponse.body;

    const response = await request(app)
      .get('/addresses?type=')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
    expect(response.body[2]).toHaveProperty('id');
    expect(response.body[2].id).toBe(address.id);
    expect(response.body[2]).toHaveProperty('description');
    expect(response.body[2]).toHaveProperty('postal_code');
    expect(response.body[2]).toHaveProperty('city');
    expect(response.body[2]).toHaveProperty('neighborhood');
    expect(response.body[2]).toHaveProperty('street');
    expect(response.body[2]).toHaveProperty('number');
    expect(response.body[2]).toHaveProperty('address_type');
  });

  it('Should be able to update an address', async () => {
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
        address_type: 'PERSONAL',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const address = addressResponse.body;

    const response = await request(app)
      .put(`/addresses/${address.id}`)
      .send({
        description: 'Casa do Douglas de Souza ALTERADA',
        postal_code: '12605-390',
        city: 'Lorena',
        neighborhood: 'Vila Passos',
        street: 'Mario P de Aquino Filho',
        number: '529',
        address_type: 'PERSONAL',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(address.id);
    expect(response.body).toHaveProperty('description');
    expect(response.body.description).toBe('Casa do Douglas de Souza ALTERADA');
    expect(response.body).toHaveProperty('postal_code');
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('neighborhood');
    expect(response.body).toHaveProperty('street');
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('address_type');
  });

  it('Should be able to delete an address', async () => {
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
        address_type: 'PERSONAL',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const address = addressResponse.body;

    const response = await request(app)
      .delete(`/addresses/${address.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Address deleted!');
  });
});
