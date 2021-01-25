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

  public async update(user: User, userInfo: ICreateUserDTO): Promise<User> {
    const userIndex = this.users.findIndex(item => item.id === user.id);

    Object.assign(this.users[userIndex], userInfo);

    return this.users[userIndex];
  }

  public async delete(user: User): Promise<void> {
    const userIndex = this.users.findIndex(item => item.id === user.id);

    this.users.splice(userIndex, 1);
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(item => item.id === id);

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }
}

export default UsersRepository;
