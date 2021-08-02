import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Session Controller', () => {
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

  it('Should be able to authenticate', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('Should not be able to authenticate with wrong email', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'wrong@email.com',
      password: '123456',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('error');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Wrong email/password combination.');
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: 'wrongPassword',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('error');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Wrong email/password combination.');
  });
});
