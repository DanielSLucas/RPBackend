import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import { UserMapper } from '../mapper/UserMapper';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { UsersRoles } from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: UsersRoles;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    whatsapp,
    password,
    role,
  }: Request): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User doesn't exist");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const updatedUser = await this.usersRepository.update(user, {
      name,
      email,
      whatsapp,
      password: hashedPassword,
      role,
    });

    const formattedUpdatedUser = UserMapper.toDTO(updatedUser);

    return formattedUpdatedUser;
  }
}

export default UpdateUserService;
