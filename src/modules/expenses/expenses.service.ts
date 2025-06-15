import { Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository";
import { ICreateExpenseRequest } from "./dtos/requests/createExpenseRequest";
import { Expense } from "generated/prisma";
import { IListExpensesRequest } from "./dtos/requests/listExpensesRequest";
import { extractPaginationInfo } from "src/utils/extractPaginationInfo.";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";

@Injectable()
export class ExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async createExpense(data: ICreateExpenseRequest): Promise<Expense> {
    const expense = await this.expensesRepository.createExpense(data);
    return expense;
  }

  async listExpenses(
    data: IListExpensesRequest,
  ): Promise<IListExpensesResponse> {
    const expensesCount = await this.expensesRepository.countExpenses(data);
    const { has_next_page, has_previous_page, page, page_size } =
      extractPaginationInfo({
        page: data.page,
        page_size: data.page_size,
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
