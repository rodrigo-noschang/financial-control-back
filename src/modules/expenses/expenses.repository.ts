import { Injectable } from "@nestjs/common";

import { Expense } from "generated/prisma";
import { PrismaService } from "src/modules/database/prisma/prisma.service";
import { ICreateExpenseRequest } from "./dtos/requests/createExpenseRequest";

@Injectable()
export class ExpensesRepository {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: ICreateExpenseRequest): Promise<Expense> {
    const {
      amount,
      date,
      essential,
      has_installments,
      recurrent,
      category_id,
      observation,
    } = data;

    const expense = await this.prisma.expense.create({
      data: {
        amount,
        date,
        essential,
        has_installments,
        recurrent,
        category_id,
        observation,
      },
    });

    return expense;
  }
}
