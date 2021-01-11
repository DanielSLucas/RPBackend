import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRespository';

interface Request {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: 'ADM' | 'OWNER' | 'USER';
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    whatsapp,
    password,
    role,
  }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findOneByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      whatsapp,
      password: hashedPassword,
      role,
    });

    return user;
  }
}

export default CreateUserService;
