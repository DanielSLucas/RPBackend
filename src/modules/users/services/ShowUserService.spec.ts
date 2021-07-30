import AppError from '../../../shared/errors/AppError';
import { UsersRoles } from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;

let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show a user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createdUser = await createUser.execute({
      name: 'Daniel Lucas',
      email: 'daniellucas-pms@hotmail.com',
      password: '123456',
      whatsapp: '12981025796',
      role: UsersRoles.ADM,
    });

    const user = await showUser.execute(createdUser.id);

    expect(user).toEqual(createdUser);
  });

  it('should not be able to show a nonexistent user', async () => {
    await expect(
      showUser.execute('a-nonexistent-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
