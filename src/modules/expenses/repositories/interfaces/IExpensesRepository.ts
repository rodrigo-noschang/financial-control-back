import { Expense } from '@prisma/client';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { ICountAllFromSpecificMonthDTO } from '../dtos/ICountAllFromSpecificMonthDTO';
import { IListPaginatedFromSpecificMonthDTO } from '../dtos/IListPaginatedFromSpecificMonthDTO';
import { IUpdateExpenseDTO } from '../dtos/IUpdateExpenseDTO';

export const PAGE_LIMIT = 15;

export interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<Expense>;
  listPaginated(page: number): Promise<Expense[]>;
  countAll(): Promise<number>;
  calculatePeriodTotalExpenses(from: Date, to: Date): Promise<number>;
  calculatePeriodEssentialExpenses(from: Date, to: Date): Promise<number>;
  countInPeriod(data: ICountAllFromSpecificMonthDTO): Promise<number>;
  listPaginatedInPeriod(data: IListPaginatedFromSpecificMonthDTO): Promise<Expense[]>;
  findById(id: string): Promise<Expense | null>;
  update(data: IUpdateExpenseDTO): Promise<Expense>;
  delete(id: string): Promise<boolean>;
}