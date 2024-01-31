import { Expense } from "@prisma/client";
import { prisma } from "../../../../db/prisma";

import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpensesRepository } from "../interfaces/IExpensesRepository";


export class ExpensesPrismaRepository implements IExpensesRepository {
  async create(data: ICreateExpenseDTO): Promise<Expense> {
    const newExpense = await prisma.expense.create({
      data,
    });

    return newExpense;
  }

}