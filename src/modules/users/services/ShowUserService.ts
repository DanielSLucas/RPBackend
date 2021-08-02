import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

import { UserMapper } from '../mapper/UserMapper';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<IUserResponseDTO | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const formattedUser = UserMapper.toDTO(user);

    return formattedUser;
  }
}

export default ShowUserService;
