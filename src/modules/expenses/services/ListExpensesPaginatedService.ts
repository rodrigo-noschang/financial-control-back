import { Expense as ExpenseP } from "@prisma/client";

import { IExpensesRepository, PAGE_LIMIT } from "../repositories/interfaces/IExpensesRepository";
import { endOfDay, endOfMonth, setDate, setMonth, startOfMonth } from "date-fns";

interface IRequest {
  month_number?: number,
  end_day?: number;
  page?: number;
}

interface IResponse {
  total: number;
  has_more: boolean;
  expenses: ExpenseP[];
}

export class ListExpensesPaginatedService {
  constructor(
    private expenseRepository: IExpensesRepository
  ) { }

  async execute({
    month_number,
    end_day,
    page = 1,
  }: IRequest): Promise<IResponse> {
    console.log('month_number -> ', month_number);
    const today = new Date();
    const start_date = month_number ? startOfMonth(setMonth(today, month_number - 1)) : startOfMonth(today);
    const end_date = end_day ? endOfDay(setDate(start_date, end_day)) : endOfMonth(start_date);

    console.log('start_date -> ', start_date);
    console.log('end_date -> ', end_date);

    const total = await this.expenseRepository.countAll(start_date, end_date);

    const paginatedExpenses = await this.expenseRepository.listPaginated(start_date, end_date, page);
    const listedSoFar = PAGE_LIMIT * page;
    const has_more = total > listedSoFar;

    return {
      total,
      has_more,
      expenses: paginatedExpenses,
    };
  }
}