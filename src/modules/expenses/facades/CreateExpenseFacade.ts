import { Injectable } from "@nestjs/common";
import { Expense } from "generated/prisma";

import { CreateExpenseBodyDTO } from "../dtos/requests/createExpenseBody";
import { CreateExpenseService } from "../services/CreateExpenseService";

@Injectable()
export class CreateExpenseFacade {
  constructor(private createExpenseService: CreateExpenseService) {}

  async execute(data: CreateExpenseBodyDTO): Promise<Expense> {
    const expense = await this.createExpenseService.execute(data);
    return expense;
  }
}
