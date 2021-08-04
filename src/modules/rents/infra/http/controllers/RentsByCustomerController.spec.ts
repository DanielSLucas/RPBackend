import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { add, startOfDay } from 'date-fns';
import createConnection from '../../../../../shared/infra/typeorm/index';

import { app } from '../../../../../shared/infra/http/app';

let connection: Connection;

describe('Rents By Cusomer Controller', () => {
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

  it('Should be able to show a rent', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    const authToken = authResponse.body.token;

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
        address_type: 'Cobrança',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    const address = addressResponse.body;

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

    const product = productResponse.body;

    const rent1Response = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: startOfDay(add(new Date(), { days: 5 })),
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

    const rent1 = rent1Response.body;

    const rent2Response = await request(app)
      .post('/rents')
      .send({
        customer_id: customer.id,
        address_id: address.id,
        rent_date: startOfDay(add(new Date(), { days: 5 })),
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

    const rent2 = rent2Response.body;

    const response = await request(app)
      .get(`/rents/customers/${customer.id}`)
      .set({
        Authorization: `Bearer ${authToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual([rent1, rent2]);
  });
});
