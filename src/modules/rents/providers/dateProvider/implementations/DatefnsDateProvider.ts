import { isBefore, add } from 'date-fns';
import { IDateProvider } from '../IDateProvider';

class DatefnsDateProvider implements IDateProvider {
  isPastDate(date: Date): boolean {
    return isBefore(date, Date.now());
  }

  datePlusSevenDays(date: Date): Date {
    return add(date, { days: 7 });
  }
}

export { DatefnsDateProvider };
