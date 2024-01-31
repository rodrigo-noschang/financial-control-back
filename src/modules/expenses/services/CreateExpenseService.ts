import { Expense } from "@prisma/client";
import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";
import validateDateUtil from "../../../utils/validateDateUtil";

interface IRequest {
  category_id: string;
  amount: number;
  observation?: string;
  date: string;
  essential: boolean;
  recurrent: boolean;
}

export class CreateExpenseService {
  constructor(
    private expenseRepository: IExpensesRepository
  ) { }

  async execute({
    category_id,
    amount,
    observation,
    date,
    essential,
    recurrent,
  }: IRequest): Promise<Expense> {
    const formatedDate = validateDateUtil(date);

    const newExpense = await this.expenseRepository.create({
      category_id,
      amount,
      observation,
      date: formatedDate,
      essential,
      recurrent,
    });

    return newExpense;
  }
}