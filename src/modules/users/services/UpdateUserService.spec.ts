import AppError from '../../../shared/errors/AppError';
import { UsersRoles } from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update an user ', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'Daniel Lucas P M Santos',
      email: 'daniellucas-pms@hotmail.com',
      password: 'ddll9000',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
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
    await expect(
      updateUser.execute({
        user_id: 'nonexistent-user-id',
        name: 'Daniel Lucas P M Santos',
        email: 'daniellucas-pms@hotmail.com',
        password: 'ddll9000',
        whatsapp: '12981025796',
        role: UsersRoles.ADM,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
