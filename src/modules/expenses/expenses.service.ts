import { Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository";
import { CreateExpenseBodyDTO } from "./dtos/requests/createExpenseBody";
import { Expense } from "generated/prisma";
import { ListExpensesQueryDTO } from "./dtos/requests/listExpensesQuery";
import { extractPaginationInfo } from "src/utils/extractPaginationInfo.";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";
import { endOfMonth, startOfMonth } from "date-fns";
import { GetExpensesSummaryQueryDTO } from "./dtos/requests/getExpensesSummaryQuery";
import { IGetExpensesSummaryResponse } from "./dtos/response/GetExpensesSummaryResponse";

@Injectable()
export class ExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async createExpense(data: CreateExpenseBodyDTO): Promise<Expense> {
    const expense = await this.expensesRepository.createExpense(data);
    return expense;
  }

  async listExpenses(
    data: ListExpensesQueryDTO,
  ): Promise<IListExpensesResponse> {
    const { page = DEFAULT_PAGE, page_size = DEFAULT_PAGE_SIZE, search } = data;

    const startDate = data.start_date ?? startOfMonth(new Date());
    const endDate = data.end_date ?? endOfMonth(new Date());

    const expensesCount = await this.expensesRepository.countExpenses({
      page,
      page_size,
      start_date: startDate,
      end_date: endDate,
      search,
    });

    const { has_next_page, has_previous_page } = extractPaginationInfo({
      page: page,
      page_size: page_size,
      total: expensesCount,
    });

    const expenses = await this.expensesRepository.listExpenses({
      page,
      page_size,
      start_date: startDate,
      end_date: endDate,
      search,
    });

    return {
      expenses,
      pagination: {
        has_next_page,
        has_previous_page,
        total: expensesCount,
        page,
        page_size,
      },
    };
  }

  async getExpensesSummary(
    data: GetExpensesSummaryQueryDTO,
  ): Promise<IGetExpensesSummaryResponse> {
    const startDate = data.start_date ?? startOfMonth(new Date());
    const endDate = data.end_date ?? endOfMonth(new Date());

    const { essentials, rest } =
      await this.expensesRepository.getExpensesSummary({
        start_date: startDate,
        end_date: endDate,
      });

    const total = essentials + rest;

    return { essentials, rest, total };
  }
}
