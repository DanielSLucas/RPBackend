import { hash } from 'bcryptjs';
import { createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash('ddll9000', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, whatsapp, role, created_at, updated_at)
      values('${id}', 'Daniel Lucas', 'daniellucas-pms@hotmail.com', '${password}', '12981025796', 'ADM', 'now()', 'now()')
    `,
  );

  await connection.close();
}

// eslint-disable-next-line no-console
create().then(() => console.log('User admin created!'));
