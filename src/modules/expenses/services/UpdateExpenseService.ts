import { Expense } from "@prisma/client";

import { AppError } from "../../../errors";

import { validateDateUtil } from "../../../utils/validateDateUtil";
import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";
import { ICategoriesRepository } from "../../categories/repositories/interface/ICategoriesRepository";

interface IRequest {
  id: string;
  category_id?: string;
  observation?: string;
  amount?: number;
  date?: string;
  essential?: boolean;
  recurrent?: boolean;
}

export class UpdateExpenseService {
  constructor(
    private expensesRepository: IExpensesRepository,
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({
    id,
    category_id,
    observation,
    amount,
    date,
    essential,
    recurrent,
  }: IRequest): Promise<Expense> {
    const expense = await this.expensesRepository.findById(id);

    if (!expense) {
      throw new AppError('Despesa não encontrada');
    }

    if (category_id) {
      const newCategory = await this.categoriesRepository.findById(category_id);

      if (!newCategory) {
        throw new AppError('Categoria não encontrada');
      }
    }

    const validatedDate = date ? validateDateUtil(date) : undefined;

    const updatedExpense = await this.expensesRepository.update({
      id,
      category_id,
      observation,
      amount,
      essential,
      recurrent,
      date: validatedDate,
    });

    return updatedExpense;
  }
}