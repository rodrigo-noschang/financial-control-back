import { Expense } from '../entities/Expense';
import { Expense as ExpenseP } from '@prisma/client';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateExpenseInput } from '../inputs/CreateExpenseInput';
import { ExpensesPrismaRepository } from '../repositories/prisma/ExpensesRepository';

import { CreateExpenseService } from '../services/CreateExpenseService';
import { ListExpensesPaginatedService } from '../services/ListExpensesPaginatedService';

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

  @Query(() => [Expense])
  async listExpensesPaginated(
    @Arg('page', { nullable: true, defaultValue: 1 }) page?: number
  ): Promise<ExpenseP[]> {
    const prismaRepository = new ExpensesPrismaRepository();
    const listExpenses = new ListExpensesPaginatedService(prismaRepository);

    const expensesList = await listExpenses.execute({ page });

    return expensesList;
  }
}