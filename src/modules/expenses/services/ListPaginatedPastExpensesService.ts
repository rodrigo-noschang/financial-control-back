import { Expense as ExpenseP } from '@prisma/client';

import { IExpensesRepository, PAGE_LIMIT } from '../repositories/interfaces/IExpensesRepository';

interface IRequest {
  page?: number;
}

interface IResponse {
  has_more: boolean;
  total: number;
  expenses: ExpenseP[]
}

export class ListPaginatedPastExpensesService {
  constructor(
    private expenseRepository: IExpensesRepository
  ) { }

  async execute({ page = 1 }: IRequest): Promise<IResponse> {
    const pastExpenses = await this.expenseRepository.listPaginated(page);
    const totalExpenses = await this.expenseRepository.countAll();

    const has_more = totalExpenses > page * PAGE_LIMIT;

    return {
      total: totalExpenses,
      has_more,
      expenses: pastExpenses,
    };
  }
}