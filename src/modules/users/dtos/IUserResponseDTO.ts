import { UsersRoles } from '../infra/typeorm/entities/User';

interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: UsersRoles;
}

export { IUserResponseDTO };
