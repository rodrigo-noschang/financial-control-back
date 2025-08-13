import { Injectable } from "@nestjs/common";

import { Expense } from "generated/prisma";
import { ExpensesRepository } from "../expenses.repository";
import { CreateExpenseBodyDTO } from "../dtos/requests/createExpenseBody";

@Injectable()
export class CreateExpenseService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute(data: CreateExpenseBodyDTO): Promise<Expense> {
    const expense = await this.expensesRepository.createExpense(data);
    return expense;
  }
}
