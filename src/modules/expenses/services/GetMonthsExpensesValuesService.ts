import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";

import { endOfDay, endOfMonth, setDate, setMonth, startOfMonth } from 'date-fns';

interface IRequest {
  month_number: number;
  end_date: number;
}

interface IResponse {
  total: number;
  essentials: number;
  restoio: number;
}

export class GetMonthsExpensesValuesService {
  constructor(private expensesRepository: IExpensesRepository) { }

  async execute({
    month_number,
    end_date
  }: IRequest): Promise<IResponse> {
    const today = new Date();
    const monthDate = setMonth(today, month_number - 1);

    const start_date = startOfMonth(monthDate);
    const end = end_date ? endOfDay(setDate(monthDate, end_date)) : endOfMonth(monthDate);

    const totalExpenses = await this.expensesRepository.getMonthsValue(start_date, end);
    const essentialExpenses = await this.expensesRepository.getMonthsEssentialsValue(start_date, end);

    const total = totalExpenses.reduce((acc, curr) => {
      return acc + curr.amount
    }, 0);

    const essentials = essentialExpenses.reduce((acc, curr) => {
      return acc + curr.amount
    }, 0);

    return {
      total,
      essentials,
      restoio: total - essentials,
    };
  }
}