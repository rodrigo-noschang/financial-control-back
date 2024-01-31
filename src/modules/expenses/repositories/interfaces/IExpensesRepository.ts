import { Expense as ExpenseP } from '@prisma/client';

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";

export interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<ExpenseP>;
}