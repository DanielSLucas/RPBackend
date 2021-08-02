interface IDateProvider {
  isPastDate(date: Date): boolean;
  datePlusSevenDays(date: Date): Date;
}

export { IDateProvider };
