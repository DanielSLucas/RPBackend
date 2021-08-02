import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { UsersRoles } from '../infra/typeorm/entities/User';
import { UserMapper } from '../mapper/UserMapper';

interface Request {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: UsersRoles;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    whatsapp,
    password,
    role,
  }: Request): Promise<IUserResponseDTO> {
    const checkUserExists = await this.usersRepository.findOneByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      whatsapp,
      password: hashedPassword,
      role,
    });

    const formattedUser = UserMapper.toDTO(user);

    return formattedUser;
  }
}

export default CreateUserService;
