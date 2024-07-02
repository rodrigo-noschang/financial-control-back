import { randomUUID } from 'node:crypto';
import { Expense as ExpenseP } from '@prisma/client';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpensesRepository, PAGE_LIMIT } from "../interfaces/IExpensesRepository";
import { ICountAllFromSpecificMonthDTO } from '../dtos/ICountAllFromSpecificMonthDTO';
import { IListPaginatedFromSpecificMonthDTO } from '../dtos/IListPaginatedFromSpecificMonthDTO';

export class InMemoryExpensesRepository implements IExpensesRepository {
  private inMemoryDatabase: ExpenseP[] = [];

  async create(data: ICreateExpenseDTO): Promise<ExpenseP> {
    const newExpense: ExpenseP = {
      id: randomUUID(),
      category_id: data.category_id,
      amount: data.amount,
      observation: data.observation ?? null,
      date: data.date,
      essential: data.essential,
      recurrent: data.recurrent,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.inMemoryDatabase.push(newExpense);

    return newExpense;
  }

  async listPaginated(page: number): Promise<ExpenseP[]> {
    const skip = (page - 1) * PAGE_LIMIT;
    const take = page * PAGE_LIMIT;

    const sortedExpenses = this.inMemoryDatabase.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

    const paginatedExpenses = sortedExpenses.slice(skip, take);

    return paginatedExpenses;
  }

  async countAll(): Promise<number> {
    const expensesCount = this.inMemoryDatabase.length;

    return expensesCount;
  }

  async calculateMonthTotalExpenses(from: Date, to: Date): Promise<number> {
    const expensesWithinInterval = this.inMemoryDatabase.filter(expense => {
      return expense.date >= from && expense.date <= to;
    });

    const totalExpenses = expensesWithinInterval.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    return totalExpenses;
  }

  async calculateMonthEssentialExpenses(from: Date, to: Date): Promise<number> {
    const expensesWithinInterval = this.inMemoryDatabase.filter(expense => {
      return expense.date >= from && expense.date <= to && expense.essential;
    });

    const essentialExpenses = expensesWithinInterval.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    return essentialExpenses;
  }

  async countAllFromSpecificMonth({
    from,
    to,
  }: ICountAllFromSpecificMonthDTO): Promise<number> {
    const specificMonthExpenses = this.inMemoryDatabase.filter(expense => {
      return expense.date >= from && expense.date <= to;
    });

    return specificMonthExpenses.length;
  }

  async listPaginatedFromSpecificMonth({
    from,
    to,
    page,
  }: IListPaginatedFromSpecificMonthDTO): Promise<ExpenseP[]> {
    const skip = (page - 1) * PAGE_LIMIT;
    const take = page * PAGE_LIMIT;

    const specificMonthExpenses = this.inMemoryDatabase.filter(expense => {
      return expense.date >= from && expense.date <= to;
    });

    const sortedExpenses = specificMonthExpenses.sort((a, b) => b.date.getTime() - a.date.getTime());

    const paginatedExpenses = sortedExpenses.slice(skip, take);

    return paginatedExpenses;
  }
}