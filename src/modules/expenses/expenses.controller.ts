import { Body, Controller, Post } from "@nestjs/common";

import { ExpensesService } from "./expenses.service";
import { ICreateExpenseRequest } from "./dtos/requests/createExpenseRequest";
import { ICreateExpenseResponse } from "./dtos/response/CreateExpenseResponse";

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
}
