import { format, startOfDay, endOfDay } from "date-fns";
import { ExpensesWithFormattedDate } from "../../scalars/responses/ExpensesWithFormattedDate";
import { IExpensesRepository, PAGE_LIMIT } from "../repositories/interfaces/IExpensesRepository";

interface IRequest {
  start_date: string;
  end_date: string;
  page?: number;
}

interface IResponse {
  has_more: boolean;
  total: number;
  expenses: ExpensesWithFormattedDate[]
}

export class ListPaginatedExpensesOfAnyPeriodService {
  constructor(
    private expensesRepository: IExpensesRepository
  ) { }

  async execute({
    start_date,
    end_date,
    page = 1,
  }: IRequest): Promise<IResponse> {
    const startDate = startOfDay(new Date(start_date));
    const endDate = endOfDay(new Date(end_date));

    const periodExpensesCount = await this.expensesRepository.countAllInPeriod({
      from: startDate,
      to: endDate,
    });

    const periodExpenses = await this.expensesRepository.listPaginatedInPeriod({
      from: startDate,
      to: endDate,
      page,
    });

    const expensesWithFormattedDate: ExpensesWithFormattedDate[] = periodExpenses.map(expense => {
      return {
        ...expense,
        formatted_date: format(expense.date, 'dd/MM/yyyy'),
      };
    })

    return {
      expenses: expensesWithFormattedDate,
      has_more: (page * PAGE_LIMIT) < periodExpensesCount,
      total: periodExpensesCount,
    };
  }
}