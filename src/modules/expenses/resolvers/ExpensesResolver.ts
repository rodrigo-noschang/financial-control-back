import { Expense } from '../entities/Expense';
import { Expense as ExpenseP } from '@prisma/client';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateExpenseInput } from '../inputs/CreateExpenseInput';
import { CreateExpenseService } from '../services/CreateExpenseService';
import { ExpensesPrismaRepository } from '../repositories/prisma/ExpensesRepository';

@Resolver()
export class ExpensesResolver {
  @Mutation(() => Expense)
  async createExpense(
    @Arg('data') {
      category_id,
      amount,
      observation,
      date,
      essential,
      recurrent,
    }: CreateExpenseInput
  ): Promise<ExpenseP> {
    const prismaRepository = new ExpensesPrismaRepository();
    const createExpenseService = new CreateExpenseService(prismaRepository);

    const newExpense = await createExpenseService.execute({
      category_id,
      amount,
      observation,
      date,
      essential,
      recurrent,
    });

    return newExpense;
  }

  @Query(() => String)
  sayHello(): string {
    return 'hello';
  }
}