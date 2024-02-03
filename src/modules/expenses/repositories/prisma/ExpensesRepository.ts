import { Expense as ExpenseP } from "@prisma/client";
import { prisma } from "../../../../db/prisma";

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpensesRepository, PAGE_LIMIT } from "../interfaces/IExpensesRepository";

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
      include: { category: true }
    });

    return expenseList;
  }

  async countAll(): Promise<number> {
    const allExpensesCount = await prisma.expense.count();

    return allExpensesCount;
  }
}