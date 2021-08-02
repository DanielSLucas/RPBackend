import { inject, injectable } from 'tsyringe';

import IRentsRepository from '../repositories/IRentsRepository';

import Rent from '../infra/typeorm/entities/Rent';
import { IDateProvider } from '../providers/dateProvider/IDateProvider';

@injectable()
class ListRentsForTheWeekService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute(date: Date): Promise<Rent[]> {
    const datePlusSeven = this.dateProvider.datePlusSevenDays(date);

    const rents = await this.rentsRepository.findBetweenDates(
      date,
      datePlusSeven,
    );

    return rents;
  }
}

export default ListRentsForTheWeekService;
