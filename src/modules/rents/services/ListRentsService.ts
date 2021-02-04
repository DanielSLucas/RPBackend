import { inject, injectable } from 'tsyringe';

import IRentsRepository from '../repositories/IRentsRepository';

import Rent from '../infra/typeorm/entities/Rent';

@injectable()
class ListRentsService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,
  ) {}

  public async execute(): Promise<Rent[]> {
    const rents = await this.rentsRepository.findAll();

    return rents;
  }
}

export default ListRentsService;
