import { v4 } from 'uuid';

import IUsersRepository from '../IUsersRespository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userInfo: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      ...userInfo,
    });

    this.users.push(user);

    return user;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);

    return user;
  }
}

export default UsersRepository;
