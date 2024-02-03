import { Expense as ExpenseP } from "@prisma/client";
import { prisma } from "../../../../db/prisma";

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpensesRepository } from "../interfaces/IExpensesRepository";

export const PAGE_LIMIT = 15;

export class ExpensesPrismaRepository implements IExpensesRepository {
  async create(data: ICreateExpenseDTO): Promise<ExpenseP> {
    const newExpense = await prisma.expense.create({
      data,
    });

    return newExpense;
  }

  async listPaginated(page: number): Promise<ExpenseP[]> {
    const expenseList = await prisma.expense.findMany({
      skip: (page - 1) * PAGE_LIMIT,
      take: page * PAGE_LIMIT,
      orderBy: {
        date: 'desc',
      },
    });

    return expenseList;
  }

}