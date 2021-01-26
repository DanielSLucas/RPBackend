import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ShowUserService from './ShowUserService';

describe('ShowUser', () => {
  it('should be able to show a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const showUser = new ShowUserService(fakeUsersRepository);
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createdUser = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    const user = await showUser.execute(createdUser.id);

    expect(user).toEqual(createdUser);
  });

  it('should not be able to show a nonexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showUser = new ShowUserService(fakeUsersRepository);

    await expect(
      showUser.execute('a-nonexistent-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
