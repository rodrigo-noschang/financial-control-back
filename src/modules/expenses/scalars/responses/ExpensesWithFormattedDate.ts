import { Expense as ExpenseP } from "@prisma/client";

export interface ExpensesWithFormattedDate extends ExpenseP {
  formatted_date: string;
}