import { format, startOfDay, endOfDay } from "date-fns";
import { ExpensesWithFormattedDate } from "../scalars/responses/ExpensesWithFormattedDate";
import { IExpensesRepository, PAGE_LIMIT } from "../repositories/interfaces/IExpensesRepository";
import { validateDateUtil } from "../../../utils/validateDateUtil";

interface IRequest {
  start_date: string;
  end_date: string;
  essentials_only?: boolean;
  rest_only?: boolean;
  recurrent_only?: boolean;
  non_recurrent_only?: boolean;
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
    essentials_only = false,
    rest_only = false,
    non_recurrent_only = false,
    recurrent_only = false,
  }: IRequest): Promise<IResponse> {
    const startDate = validateDateUtil(start_date);
    const endDate = validateDateUtil(end_date);

    const periodExpensesCount = await this.expensesRepository.countInPeriod({
      from: startDate,
      to: endDate,
      essentials_only,
      rest_only,
      recurrent_only,
      non_recurrent_only,
    });

    const periodExpenses = await this.expensesRepository.listPaginatedInPeriod({
      from: startDate,
      to: endDate,
      essentials_only,
      rest_only,
      recurrent_only,
      non_recurrent_only,
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