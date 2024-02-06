import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";

import { endOfDay, endOfMonth, setDate, setMonth, startOfMonth } from 'date-fns';

interface IRequest {
  month_number: number;
  end_day: number;
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
    end_day
  }: IRequest): Promise<IResponse> {
    const today = new Date();
    const start_date = month_number ? startOfMonth(setMonth(today, month_number - 1)) : startOfMonth(today);
    const end_date = end_day ? endOfDay(setDate(start_date, end_day)) : endOfMonth(start_date);

    const totalExpenses = await this.expensesRepository.getMonthsValue(start_date, end_date);
    const essentialExpenses = await this.expensesRepository.getMonthsEssentialsValue(start_date, end_date);

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