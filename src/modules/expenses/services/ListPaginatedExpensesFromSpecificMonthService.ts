import { format } from "date-fns";
import { ExpensesWithFormattedDate } from "../../scalars/responses/ExpensesWithFormattedDate";
import { IExpensesRepository, PAGE_LIMIT } from "../repositories/interfaces/IExpensesRepository";

interface IRequest {
  specific_month_date: string;
  page?: number;
}

interface IResponse {
  has_more: boolean;
  total: number;
  expenses: ExpensesWithFormattedDate[]
}

export class ListPaginatedExpensesFromSpecificMonthService {
  constructor(
    private expensesRepository: IExpensesRepository
  ) { }

  async execute({
    specific_month_date,
    page = 1,
  }: IRequest): Promise<IResponse> {
    const paginatedExpensesCount = await this.expensesRepository.countAllFromSpecificMonth(
      new Date(specific_month_date)
    );

    const paginatedExpenses = await this.expensesRepository.listPaginatedFromSpecificMonth(
      new Date(specific_month_date),
      page
    );

    const expensesWithFormattedDate: ExpensesWithFormattedDate[] = paginatedExpenses.map(expense => {
      return {
        ...expense,
        formatted_date: format(expense.date, 'dd/MM/yyyy'),
      }
    });

    return {
      total: paginatedExpensesCount,
      expenses: expensesWithFormattedDate,
      has_more: (page * PAGE_LIMIT) < paginatedExpensesCount,
    }

  }
}