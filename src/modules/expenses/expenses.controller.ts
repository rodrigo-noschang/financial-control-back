import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { ExpensesService } from "./expenses.service";
import { CreateExpenseBodyDTO } from "./dtos/requests/createExpenseBody";
import { ICreateExpenseResponse } from "./dtos/response/CreateExpenseResponse";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";
import { ListExpensesQueryDTO } from "./dtos/requests/listExpensesQuery";
import { GetExpensesSummaryQueryDTO } from "./dtos/requests/getExpensesSummaryQuery";
import { IGetExpensesSummaryResponse } from "./dtos/response/GetExpensesSummaryResponse";

@Controller("/expense")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async createExpense(
    @Body() data: CreateExpenseBodyDTO,
  ): Promise<ICreateExpenseResponse> {
    const expense = await this.expensesService.createExpense(data);
    return { expense };
  }

  @Get()
  async listExpenses(
    @Query() query: ListExpensesQueryDTO,
  ): Promise<IListExpensesResponse> {
    const { expenses, pagination } =
      await this.expensesService.listExpenses(query);

    return {
      expenses,
      pagination,
    };
  }

  @Get("/summary")
  async getExpensesSummary(
    @Query() query: GetExpensesSummaryQueryDTO,
  ): Promise<IGetExpensesSummaryResponse> {
    const { essentials, rest, total } =
      await this.expensesService.getExpensesSummary(query);

    return {
      essentials,
      rest,
      total,
    };
  }
}
