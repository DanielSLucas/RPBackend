import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import authConfig from '../../../config/auth';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new AppError('Wrong email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Wrong email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { token, user };
  }
}

export default AuthenticateUserService;
