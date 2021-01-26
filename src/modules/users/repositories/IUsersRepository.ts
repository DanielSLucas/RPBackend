import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(userInfo: ICreateUserDTO): Promise<User>;
  update(user: User, userInfo: ICreateUserDTO): Promise<User>;
  delete(user: User): Promise<void>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
}
