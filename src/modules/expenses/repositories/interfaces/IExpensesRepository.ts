import { Expense as ExpenseP } from '@prisma/client';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { ICountAllFromSpecificMonthDTO } from '../dtos/ICountAllFromSpecificMonthDTO';
import { IListPaginatedFromSpecificMonthDTO } from '../dtos/IListPaginatedFromSpecificMonthDTO';

export const PAGE_LIMIT = 15;

export interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<ExpenseP>;
  listPaginated(page: number): Promise<ExpenseP[]>;
  countAll(): Promise<number>;
  calculateMonthTotalExpenses(from: Date, to: Date): Promise<number>;
  calculateMonthEssentialExpenses(from: Date, to: Date): Promise<number>;
  listPaginatedFromSpecificMonth(data: IListPaginatedFromSpecificMonthDTO): Promise<ExpenseP[]>;
  countAllFromSpecificMonth(data: ICountAllFromSpecificMonthDTO): Promise<number>;
}