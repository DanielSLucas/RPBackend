import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';

import User from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    whatsapp,
    role,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({
      name,
      email,
      password,
      whatsapp,
      role,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async update(
    user: User,
    { name, email, password, whatsapp, role }: ICreateUserDTO,
  ): Promise<User> {
    Object.assign(user, {
      name,
      email,
      password,
      whatsapp,
      role,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}

export default UsersRepository;
