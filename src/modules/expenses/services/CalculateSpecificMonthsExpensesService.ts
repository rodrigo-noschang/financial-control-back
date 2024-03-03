import { startOfMonth, endOfMonth, setMonth, getMonth } from 'date-fns';

import { IExpensesRepository } from '../repositories/interfaces/IExpensesRepository';

interface IRequest {
  actual_month_number?: number;
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

  async execute({ actual_month_number }: IRequest): Promise<IResponse> {
    const today = new Date();

    let monthNumber = actual_month_number ? actual_month_number - 1 : getMonth(today);

    if (monthNumber < 0 || monthNumber > 11) {
      monthNumber = getMonth(today);
    }

    const expectedMonthDate = setMonth(today, monthNumber);

    const start_of_month = startOfMonth(expectedMonthDate);
    const end_of_month = endOfMonth(expectedMonthDate);

    const monthsTotalExpenses = await this.expensesRepository.calculateMonthTotalExpenses(
      start_of_month,
      end_of_month,
    );

    const monthsEssentialExpenses = await this.expensesRepository.calculateMonthEssentialExpenses(
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