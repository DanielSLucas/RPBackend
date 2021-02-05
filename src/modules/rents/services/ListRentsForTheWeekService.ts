import { inject, injectable } from 'tsyringe';

import { add } from 'date-fns';
import IRentsRepository from '../repositories/IRentsRepository';

import Rent from '../infra/typeorm/entities/Rent';

@injectable()
class ListRentsForTheWeekService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,
  ) {}

  public async execute(date: Date): Promise<Rent[]> {
    const datePlusSeven = add(date, { days: 7 });

    const rents = await this.rentsRepository.findBetweenDates(
      date,
      datePlusSeven,
    );

    return rents;
  }
}

export default ListRentsForTheWeekService;
