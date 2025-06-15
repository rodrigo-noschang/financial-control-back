import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { ExpensesService } from "./expenses.service";
import { ICreateExpenseRequest } from "./dtos/requests/createExpenseRequest";
import { ICreateExpenseResponse } from "./dtos/response/CreateExpenseResponse";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";
import { ListExpensesRequestDTO } from "./dtos/requests/listExpensesRequest";

@Controller("/expense")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async createExpense(
    @Body() data: ICreateExpenseRequest,
  ): Promise<ICreateExpenseResponse> {
    const expense = await this.expensesService.createExpense(data);
    return { expense };
  }

  @Get()
  async listExpenses(
    // @Query("page") page: number | undefined = DEFAULT_PAGE,
    // @Query("page_size") page_size: number | undefined = DEFAULT_PAGE_SIZE,
    // @Query("search") search: string | undefined = DEFAULT_SEARCH_VALUE,
    // @Query("start_date") start_date: Date | undefined,
    // @Query("end_date") end_date: Date | undefined,
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
