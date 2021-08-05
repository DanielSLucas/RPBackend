import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Product by date Controller', () => {
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

  it('Should be able to list all available products in a specific date (or today date)', async () => {
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
        product_type: 'CAKES',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = productResponse.body;

    const response = await request(app)
      .get(`/products/available?date=${new Date().toISOString()}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toEqual(product.id);
    expect(response.body[0].name).toEqual('Bolo normal');
    expect(response.body[0].quantity).toEqual(1);
    expect(response.body[0].value).toEqual(50);
    expect(response.body[0].product_type).toEqual('CAKES');
  });
});
