import { inject, injectable } from 'tsyringe';

import IRentsRepository from '../repositories/IRentsRepository';

import AppError from '../../../shared/errors/AppError';

@injectable()
class DeleteRentService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,
  ) {}

  public async execute(rent_id: string): Promise<void> {
    const rent = await this.rentsRepository.findById(rent_id);

    if (!rent) {
      throw new AppError("Rent doesn't exist.");
    }

    await this.rentsRepository.delete(rent);
  }
}

export default DeleteRentService;
