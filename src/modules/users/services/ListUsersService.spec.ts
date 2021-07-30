import { UsersRoles } from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ListUsersService from './ListUsersService';

describe('ListUsers', () => {
  it('should be able to list all users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const listUsers = new ListUsersService(fakeUsersRepository);

    const user1 = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    const user2 = await createUser.execute({
      name: 'Lucas',
      email: 'lucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: UsersRoles.USER,
    });

    const users = await listUsers.execute();

    expect(users).toEqual([user1, user2]);
  });
});
