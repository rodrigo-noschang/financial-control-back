import { Expense as ExpenseP } from "@prisma/client";
import { prisma } from "../../../../db/prisma";

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpensesRepository, PAGE_LIMIT } from "../interfaces/IExpensesRepository";
import { ICountAllFromSpecificMonthDTO } from "../dtos/ICountAllFromSpecificMonthDTO";
import { IListPaginatedFromSpecificMonthDTO } from "../dtos/IListPaginatedFromSpecificMonthDTO";

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
      orderBy: { date: 'desc' },
      include: { category: true },
    });

    return paginatedExpenses;
  }

  async countAll(): Promise<number> {
    const totalExpenses = await prisma.expense.count();

    return totalExpenses;
  }

  async calculatePeriodTotalExpenses(from: Date, to: Date): Promise<number> {
    const totalExpenses = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: from,
          lte: to,
        },
      },
    });

    return totalExpenses._sum.amount ?? 0;
  }

  async calculatePeriodEssentialExpenses(from: Date, to: Date): Promise<number> {
    const essentialExpenses = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: from,
          lte: to,
        },
        essential: true,
      },
    });

    return essentialExpenses._sum.amount ?? 0;
  }

  async countAllInPeriod({ from, to }: ICountAllFromSpecificMonthDTO): Promise<number> {
    const expensesCount = await prisma.expense.count({
      where: {
        date: {
          gte: from,
          lte: to,
        },
      },
    });

    return expensesCount;
  }

  async listPaginatedInPeriod({
    from,
    to,
    page,
  }: IListPaginatedFromSpecificMonthDTO): Promise<ExpenseP[]> {
    const expenses = await prisma.expense.findMany({
      where: {
        date: {
          gte: from,
          lte: to,
        },
      },
      take: page * PAGE_LIMIT,
      skip: (page - 1) * PAGE_LIMIT,
      orderBy: {
        date: 'desc',
      },
    });

    return expenses;
  }
}