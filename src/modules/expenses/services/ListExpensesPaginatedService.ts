import { Expense as ExpenseP } from "@prisma/client";

import { IExpensesRepository, PAGE_LIMIT } from "../repositories/interfaces/IExpensesRepository";

interface IRequest {
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
    page = 1,
  }: IRequest): Promise<IResponse> {
    const total = await this.expenseRepository.countAll();

    const paginatedExpenses = await this.expenseRepository.listPaginated(page);
    const listedSoFar = PAGE_LIMIT * page;
    const has_more = total > listedSoFar;

    return {
      total,
      has_more,
      expenses: paginatedExpenses,
    };
  }
}