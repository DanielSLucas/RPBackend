import { UsersRoles } from '../infra/typeorm/entities/User';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: UsersRoles;
}
