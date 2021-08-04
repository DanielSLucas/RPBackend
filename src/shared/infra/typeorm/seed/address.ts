import { createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();

  await connection.query(
    `INSERT INTO ADDRESSES(id, description, postal_code, city, neighborhood, street, number, address_type, created_at, updated_at)
      values('${id}', 'Sede ruth pessoa bolos e arranjos', '12521130', 'Guaratinguetá', 'Engenheiro Neiva', 'Basf', '955', 'PICKUP', 'now()', 'now()')
    `,
  );

  await connection.close();
}

// eslint-disable-next-line no-console
create().then(() => console.log('Pick up address created!'));
