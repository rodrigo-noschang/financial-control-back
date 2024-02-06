import { Expense as ExpenseP, Prisma } from '@prisma/client';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";

export const PAGE_LIMIT = 15;

export interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<ExpenseP>;
  listPaginated(start_date: Date, end_date: Date, page: number): Promise<ExpenseP[]>;
  countAll(start_date: Date, end_date: Date): Promise<number>;
  getMonthsValue(start_date: Date, end_date: Date): Promise<ExpenseP[]>;
  getMonthsEssentialsValue(start_date: Date, end_date: Date): Promise<ExpenseP[]>;
}