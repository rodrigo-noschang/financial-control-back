import { Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository";
import { ICreateExpenseRequest } from "./dtos/requests/createExpenseRequest";
import { Expense } from "generated/prisma";

@Injectable()
export class ExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async createExpense(data: ICreateExpenseRequest): Promise<Expense> {
    const expense = await this.expensesRepository.createExpense(data);
    return expense;
  }
}
