import { Expense as ExpenseP, Prisma } from '@prisma/client';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";

export const PAGE_LIMIT = 15;

export interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<ExpenseP>;
  listPaginated(page: number): Promise<ExpenseP[]>;
  countAll(): Promise<number>;
  calculateMonthTotalExpenses(from: Date, to: Date): Promise<number>;
  calculateMonthEssentialExpenses(from: Date, to: Date): Promise<number>;
}