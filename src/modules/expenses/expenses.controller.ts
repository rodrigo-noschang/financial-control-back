import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { ListExpensesFacade } from "./facades/ListExpensesFacade";
import { CreateExpenseFacade } from "./facades/CreateExpenseFacade";
import { GetExpensesSummaryFacade } from "./facades/GetExpensesSummaryFacade";

import { CreateExpenseBodyDTO } from "./dtos/requests/createExpenseBody";
import { ICreateExpenseResponse } from "./dtos/response/CreateExpenseResponse";
import { IListExpensesResponse } from "./dtos/response/listExpensesResponse";
import { ListExpensesQueryDTO } from "./dtos/requests/listExpensesQuery";
import { GetExpensesSummaryQueryDTO } from "./dtos/requests/getExpensesSummaryQuery";
import { IGetExpensesSummaryResponse } from "./dtos/response/GetExpensesSummaryResponse";

@Controller("/expense")
export class ExpensesController {
  constructor(
    private readonly listExpensesFacade: ListExpensesFacade,
    private readonly createExpenseFacade: CreateExpenseFacade,
    private readonly getExpensesSummaryFacade: GetExpensesSummaryFacade,
  ) {}

  @Post()
  async createExpense(
    @Body() data: CreateExpenseBodyDTO,
  ): Promise<ICreateExpenseResponse> {
    const expense = await this.createExpenseFacade.execute(data);
    return { expense };
  }

  @Get()
  async listExpenses(
    @Query() query: ListExpensesQueryDTO,
  ): Promise<IListExpensesResponse> {
    const { expenses, pagination } =
      await this.listExpensesFacade.execute(query);

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
      await this.getExpensesSummaryFacade.execute(query);

    return {
      essentials,
      rest,
      total,
    };
  }
}
