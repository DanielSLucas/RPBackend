import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserService from './UpdateUserService';

describe('UpdateUser', () => {
  it('should be able to update an user ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'Daniel Lucas P M Santos',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    expect(updatedUser).toEqual({
      id: user.id,
      name: 'Daniel Lucas P M Santos',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: 'ADM',
    });
  });

  it('should not be able to update a nonexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    await expect(
      updateUser.execute({
        user_id: 'nonexistent-user-id',
        name: 'Daniel Lucas P M Santos',
        email: 'daniellucas-pms@hotmail.com',
        password: 'ddll9000',
        whatsapp: '12981025796',
        role: 'ADM',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
