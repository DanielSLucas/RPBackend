import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import User from '../infra/typeorm/entities/User';

class UserMapper {
  static toDTO({ email, name, id, role, whatsapp }: User): IUserResponseDTO {
    const user = {
      id,
      name,
      email,
      whatsapp,
      role,
    };

    return user;
  }
}

export { UserMapper };
