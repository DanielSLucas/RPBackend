import AppError from '../../../shared/errors/AppError';
import { UsersRoles } from '../infra/typeorm/entities/User';

import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    expect(user).toHaveProperty('id');
    expect(user).toEqual({
      id: user.id,
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      whatsapp: '12981025796',
      role: 'ADM',
    });
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    await expect(
      createUser.execute({
        name: 'Lucas Daniel',
        email: 'daniellucas-pms@hotmail.com',
        password: '123456',
        whatsapp: '12981025796',
        role: UsersRoles.ADM,
      }),
    ).rejects.toEqual(new AppError('Email address already used'));
  });
});
