import { Expense } from "@prisma/client";

export interface IExpensesWithFormattedDateDTO extends Expense {
  formatted_date: string;
}