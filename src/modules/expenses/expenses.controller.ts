import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { ExpensesService } from "./expenses.service";
import { CreateExpenseRequestDTO } from "./dtos/requests/createExpenseRequest";
import { ICreateExpenseResponse } from "./dtos/response/CreateExpenseResponse";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";
import { ListExpensesRequestDTO } from "./dtos/requests/listExpensesRequest";

@Controller("/expense")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async createExpense(
    @Body() data: CreateExpenseRequestDTO,
  ): Promise<ICreateExpenseResponse> {
    const expense = await this.expensesService.createExpense(data);
    return { expense };
  }

  @Get()
  async listExpenses(
    @Query() query: ListExpensesRequestDTO,
  ): Promise<IListExpensesResponse> {
    const { expenses, pagination } =
      await this.expensesService.listExpenses(query);

    return {
      expenses,
      pagination,
    };
  }
}
