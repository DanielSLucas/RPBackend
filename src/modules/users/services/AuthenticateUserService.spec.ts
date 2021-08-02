import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import { UsersRoles } from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    const response = await authenticateUser.execute({
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with an invalid email', async () => {
    await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    await expect(
      authenticateUser.execute({
        email: 'anInvalidUser@email.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Wrong email/password combination.', 401));
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    await expect(
      authenticateUser.execute({
        email: 'daniellucas-pms@hotmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toEqual(new AppError('Wrong email/password combination.', 401));
  });
});
