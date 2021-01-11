import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(userInfo: ICreateUserDTO): Promise<User>;
  findOneByEmail(email: string): Promise<User | undefined>;
}
