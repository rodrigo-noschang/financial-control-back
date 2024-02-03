import { Expense } from '../entities/Expense';
import { Expense as ExpenseP } from '@prisma/client';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateExpenseInput } from '../inputs/CreateExpenseInput';
import { ExpensesPrismaRepository } from '../repositories/prisma/ExpensesRepository';

import { CreateExpenseService } from '../services/CreateExpenseService';
import { ListExpensesPaginatedService } from '../services/ListExpensesPaginatedService';
import { PaginatedExpenseResponse } from '../../scalars/responses/PaginatedExpenseResponse';

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

  @Query(() => PaginatedExpenseResponse)
  async listExpensesPaginated(
    @Arg('page', { nullable: true, defaultValue: 1 }) page?: number
  ): Promise<PaginatedExpenseResponse> {
    const prismaRepository = new ExpensesPrismaRepository();
    const listExpenses = new ListExpensesPaginatedService(prismaRepository);

    const { total, has_more, expenses } = await listExpenses.execute({ page });

    console.log({ total, has_more, expenses });

    return { total, has_more, expenses };
  }
}