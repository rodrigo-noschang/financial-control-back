import { Expense } from "generated/prisma";
import { IPaginationInformation } from "src/dtos/paginationInfo";

export interface IListExpensesResponse {
  expenses: Expense[];
  pagination: IPaginationInformation;
}
