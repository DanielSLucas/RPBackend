import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';
import ListUsersService from './ListUsersService';

describe('DeleteUser', () => {
  it('should be able to delete a specified user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const listUsers = new ListUsersService(fakeUsersRepository);
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const deleteUser = new DeleteUserService(fakeUsersRepository);

    const user1 = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    const user2 = await createUser.execute({
      name: 'Lucas',
      email: 'lucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    await deleteUser.execute(user1.id);

    const users = await listUsers.execute();

    expect(users).toEqual([user2]);
  });

  it('should not be able to delete a nonexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const deleteUser = new DeleteUserService(fakeUsersRepository);

    await expect(
      deleteUser.execute('a-nonexistent-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
