import AppError from '../../../shared/errors/AppError';
import { UsersRoles } from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;

let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete a specified user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const listUsers = new ListUsersService(fakeUsersRepository);
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user1 = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    const user2 = await createUser.execute({
      name: 'Lucas',
      email: 'lucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    await deleteUser.execute(user1.id);

    const users = await listUsers.execute();

    expect(users).toEqual([user2]);
  });

  it('should not be able to delete a nonexistent user', async () => {
    await expect(deleteUser.execute('a-nonexistent-user-id')).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });
});
