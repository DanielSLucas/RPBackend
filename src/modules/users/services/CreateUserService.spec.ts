import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    expect(user).toHaveProperty('id');
    expect(user).toEqual({
      id: user.id,
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: user.password,
      whatsapp: '12981025796',
      role: 'ADM',
    });
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: 'ADM',
    });

    await expect(
      createUser.execute({
        name: 'Daniel Lucas',
        email: 'daniellucas-pms@hotmail.com',
        password: 'ddll9000',
        whatsapp: '12981025796',
        role: 'ADM',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
