import { startOfMonth, endOfMonth, setMonth, getMonth, getYear } from 'date-fns';

import { IExpensesRepository } from '../repositories/interfaces/IExpensesRepository';

interface IRequest {
  actual_month_number?: number;
  year?: number;
}

interface IResponse {
  total: number;
  essentials: number;
  rest: number;
}

export default class CalculateSpecificMonthsExpensesService {
  constructor(
    private expensesRepository: IExpensesRepository,
  ) { }

  async execute({ actual_month_number, year }: IRequest): Promise<IResponse> {
    const today = new Date();
    const currentMonthNumber = getMonth(today) + 1;
    const currentYearNumber = getYear(today);

    let monthNumber = currentMonthNumber;
    let actualYear = currentYearNumber;

    if (actual_month_number && year) {
      monthNumber = actual_month_number;
      actualYear = year;
    }

    const expectedDate = new Date(`${actualYear}/${monthNumber}/01`);

    const start_of_month = startOfMonth(expectedDate);
    const end_of_month = endOfMonth(expectedDate);

    const monthsTotalExpenses = await this.expensesRepository.calculatePeriodTotalExpenses(
      start_of_month,
      end_of_month,
    );

    const monthsEssentialExpenses = await this.expensesRepository.calculatePeriodEssentialExpenses(
      start_of_month,
      end_of_month,
    );

    return {
      total: monthsTotalExpenses,
      essentials: monthsEssentialExpenses,
      rest: monthsTotalExpenses - monthsEssentialExpenses,
    };
  }
}