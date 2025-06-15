import { Injectable } from "@nestjs/common";

import { Expense } from "generated/prisma";
import { PrismaService } from "src/modules/database/prisma/prisma.service";
import { CreateExpenseBodyDTO } from "./dtos/requests/createExpenseBody";
import { ListExpensesQueryDTO } from "./dtos/requests/listExpensesQuery";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SEARCH_VALUE,
} from "src/defaults/pagination";

@Injectable()
export class ExpensesRepository {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: CreateExpenseBodyDTO): Promise<Expense> {
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

  async countExpenses(data: ListExpensesQueryDTO): Promise<number> {
    const { search = DEFAULT_SEARCH_VALUE, start_date, end_date } = data;

    const dateFilter = {};

    if (start_date) {
      Object.assign(dateFilter, { gte: start_date });
    }

    if (end_date) {
      Object.assign(dateFilter, { lte: end_date });
    }

    const expensesCount = this.prisma.expense.count({
      where: {
        observation: { contains: search, mode: "insensitive" },
        date: dateFilter,
      },
    });

    return expensesCount;
  }

  async listExpenses(data: ListExpensesQueryDTO): Promise<Expense[]> {
    const {
      search = DEFAULT_SEARCH_VALUE,
      page = DEFAULT_PAGE,
      page_size = DEFAULT_PAGE_SIZE,
      start_date,
      end_date,
    } = data;

    const take = page * page_size;
    const skip = (page - 1) * page_size;

    const dateFilter = {};

    if (start_date) {
      Object.assign(dateFilter, { gte: start_date });
    }

    if (end_date) {
      Object.assign(dateFilter, { lte: end_date });
    }

    const expenses = this.prisma.expense.findMany({
      where: {
        observation: { contains: search, mode: "insensitive" },
        date: dateFilter,
      },
      orderBy: { date: "desc" },
      take,
      skip,
      include: {
        category: true,
      },
    });

    return expenses;
  }
}
