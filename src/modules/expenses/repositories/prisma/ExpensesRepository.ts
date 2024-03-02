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
    const paginatedExpenses = await prisma.expense.findMany({
      take: PAGE_LIMIT,
      skip: (page - 1) * PAGE_LIMIT,
      orderBy: { date: 'desc' }
    });

    return paginatedExpenses;
  }

  async countAll(): Promise<number> {
    const totalExpenses = await prisma.expense.count();

    return totalExpenses;
  }
}