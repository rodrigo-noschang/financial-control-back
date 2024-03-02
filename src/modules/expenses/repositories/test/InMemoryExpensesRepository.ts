import { Expense as ExpenseP } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpensesRepository, PAGE_LIMIT } from "../interfaces/IExpensesRepository";

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

    const paginatedExpenses = this.inMemoryDatabase.slice(skip, take);

    return paginatedExpenses;
  }
}