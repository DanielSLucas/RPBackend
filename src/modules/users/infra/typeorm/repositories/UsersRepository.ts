import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRespository';

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

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export default UsersRepository;
