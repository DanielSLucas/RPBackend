import { inject, injectable } from 'tsyringe';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

import { UserMapper } from '../mapper/UserMapper';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUserResponseDTO[]> {
    const users = await this.usersRepository.findAll();

    const formattedUser = users.map(user => UserMapper.toDTO(user));

    return formattedUser;
  }
}

export default ListUsersService;
