import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUsersRespository from '../repositories/IUsersRespository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRespository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.delete(userExists);
  }
}

export default DeleteUserService;
