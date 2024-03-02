import { format } from 'date-fns';

import { IExpensesRepository, PAGE_LIMIT } from '../repositories/interfaces/IExpensesRepository';
import { ExpensesWithFormattedDate } from '../../scalars/responses/ExpensesWithFormattedDate';

interface IRequest {
  page?: number;
}

interface IResponse {
  has_more: boolean;
  total: number;
  expenses: ExpensesWithFormattedDate[]
}

export class ListPaginatedPastExpensesService {
  constructor(
    private expenseRepository: IExpensesRepository
  ) { }

  async execute({ page = 1 }: IRequest): Promise<IResponse> {
    const pastExpenses = await this.expenseRepository.listPaginated(page);
    const totalExpenses = await this.expenseRepository.countAll();

    const expensesPaginatedDate: ExpensesWithFormattedDate[] = pastExpenses.map(expense => {
      return {
        ...expense,
        formatted_date: format(expense.date, 'dd/MM/yyyy'),
      };
    })

    const has_more = totalExpenses > page * PAGE_LIMIT;

    return {
      total: totalExpenses,
      has_more,
      expenses: expensesPaginatedDate,
    };
  }
}