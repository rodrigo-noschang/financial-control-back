import { IExpensesWithFormattedDateDTO } from "./IExpensesWithFormattedDateDTO";

export interface IPaginatedExpenseResponseDTO {
  total: number;
  has_more: boolean;
  expenses: IExpensesWithFormattedDateDTO[];
}