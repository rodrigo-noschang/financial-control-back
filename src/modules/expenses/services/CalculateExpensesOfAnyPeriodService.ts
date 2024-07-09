import { startOfMonth, endOfMonth, setMonth, getMonth, getYear, startOfDay, endOfDay } from 'date-fns';

import { IExpensesRepository } from '../repositories/interfaces/IExpensesRepository';

interface IRequest {
  start_date: string;
  end_date: string;
}

interface IResponse {
  total: number;
  essentials: number;
  rest: number;
}

export default class CalculateExpensesOfAnyPeriodService {
  constructor(
    private expensesRepository: IExpensesRepository,
  ) { }

  async execute({ start_date, end_date }: IRequest): Promise<IResponse> {
    const startDate = startOfDay(new Date(start_date));
    const endDate = endOfDay(new Date(end_date));

    const monthsTotalExpenses = await this.expensesRepository.calculatePeriodTotalExpenses(
      startDate,
      endDate,
    );

    const monthsEssentialExpenses = await this.expensesRepository.calculatePeriodEssentialExpenses(
      startDate,
      endDate,
    );

    return {
      total: monthsTotalExpenses,
      essentials: monthsEssentialExpenses,
      rest: monthsTotalExpenses - monthsEssentialExpenses,
    };
  }
}