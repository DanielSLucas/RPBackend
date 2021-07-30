import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Users Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('ddll9000', 8);

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

  it('Should be able to create a new user', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'johnpass',
        whatsapp: '12912345678',
        role: 'USER',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('whatsapp');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should not be able to create a new user if not authenticated with an ADM user', async () => {
    const regularUserAuthResponse = await request(app).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'johnpass',
    });

    const { token: regularUsertoken } = regularUserAuthResponse.body;

    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'johnpass',
        whatsapp: '12912345678',
        role: 'USER',
      })
      .set({
        Authorization: `Bearer ${regularUsertoken}`,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('error');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'You should be ADM to access this route',
    );
  });

  it('Should be able to show a user info by his id', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
    });

    const { token } = authResponse.body;

    const regularUserAuthResponse = await request(app).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'johnpass',
    });

    const response = await request(app)
      .get(`/users/${regularUserAuthResponse.body.user.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('whatsapp');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should be able to list all users', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get(`/users`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('whatsapp');
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('created_at');
    expect(response.body[0]).toHaveProperty('updated_at');
  });

  it('Should be able to update user info', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
    });

    const { token } = authResponse.body;

    const regularUserAuthResponse = await request(app).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'johnpass',
    });

    const response = await request(app)
      .put(`/users/${regularUserAuthResponse.body.user.id}`)
      .send({
        name: 'New John Doe',
        email: 'NEWjohndoe@email.com',
        password: 'NEWjohnpass',
        whatsapp: '12912345678',
        role: 'USER',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('whatsapp');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should be able to delete an user', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
    });

    const { token } = authResponse.body;

    const regularUserAuthResponse = await request(app).post('/sessions').send({
      email: 'NEWjohndoe@email.com',
      password: 'NEWjohnpass',
    });

    const response = await request(app)
      .delete(`/users/${regularUserAuthResponse.body.user.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User deleted!');
  });
});
