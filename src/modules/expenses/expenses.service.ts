import { Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository";
import { ICreateExpenseRequest } from "./dtos/requests/createExpenseRequest";
import { Expense } from "generated/prisma";
import { ListExpensesRequestDTO } from "./dtos/requests/listExpensesRequest";
import { extractPaginationInfo } from "src/utils/extractPaginationInfo.";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";

@Injectable()
export class ExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async createExpense(data: ICreateExpenseRequest): Promise<Expense> {
    const expense = await this.expensesRepository.createExpense(data);
    return expense;
  }

  async listExpenses(
    data: ListExpensesRequestDTO,
  ): Promise<IListExpensesResponse> {
    const expensesCount = await this.expensesRepository.countExpenses(data);
    const { page = DEFAULT_PAGE, page_size = DEFAULT_PAGE_SIZE } = data;

    const { has_next_page, has_previous_page } = extractPaginationInfo({
      page: page,
      page_size: page_size,
      total: expensesCount,
    });

    const expenses = await this.expensesRepository.listExpenses(data);

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
}
