import { format, startOfMonth, endOfMonth } from "date-fns";
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
    const specificDate = new Date(specific_month_date);
    const startOfSpecificMonth = startOfMonth(specificDate);
    const endOfSpecificMonth = endOfMonth(specificDate);

    const paginatedExpensesCount = await this.expensesRepository.countInPeriod({
      from: startOfSpecificMonth,
      to: endOfSpecificMonth,
    });

    const paginatedExpenses = await this.expensesRepository.listPaginatedInPeriod({
      from: startOfSpecificMonth,
      to: endOfSpecificMonth,
      page
    });

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