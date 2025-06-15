import { Expense } from "generated/prisma";

export interface ICreateExpenseResponse {
  expense: Expense;
}
