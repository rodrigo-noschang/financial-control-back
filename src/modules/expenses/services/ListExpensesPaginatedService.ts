import { Expense as ExpenseP } from "@prisma/client";
import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";

interface IRequest {
  page?: number;
}

export class ListExpensesPaginatedService {
  constructor(
    private expenseRepository: IExpensesRepository
  ) { }

  async execute({
    page = 1,
  }: IRequest): Promise<ExpenseP[]> {
    const paginatedExpenses = await this.expenseRepository.listPaginated(page);

    return paginatedExpenses;
  }
}