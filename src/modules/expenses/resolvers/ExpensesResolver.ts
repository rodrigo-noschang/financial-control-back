import { Expense } from '../entities/Expense';
import { Expense as ExpenseP } from '@prisma/client';
import { Resolver, Mutation, Arg, Query, InterfaceResolveTypeError } from 'type-graphql';

import { CreateExpenseInput } from '../inputs/CreateExpenseInput';
import { ExpensesPrismaRepository } from '../repositories/prisma/ExpensesRepository';

import { CreateExpenseService } from '../services/CreateExpenseService';
import { ListExpensesPaginatedService } from '../services/ListExpensesPaginatedService';
import { PaginatedExpenseResponse } from '../../scalars/responses/PaginatedExpenseResponse';
import { ExpensesTotalsResponse } from '../../scalars/responses/ExpensesTotalsResponse';
import { GetMonthExpensesValueInput } from '../inputs/GetMonthExpensesValueInput';
import { GetMonthsExpensesValuesService } from '../services/GetMonthsExpensesValuesService';
import { ListExpensesPaginatedInput } from '../inputs/ListExpensesPaginatedInput';

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
    @Arg('interval', { nullable: true }) interval: ListExpensesPaginatedInput,
    @Arg('page', { nullable: true, defaultValue: 1 }) page?: number
  ): Promise<PaginatedExpenseResponse> {
    const prismaRepository = new ExpensesPrismaRepository();
    const listExpenses = new ListExpensesPaginatedService(prismaRepository);

    const end_day = interval?.end_day ?? null;
    const month_number = interval?.month_number ?? null;

    const { total, has_more, expenses } = await listExpenses.execute({
      end_day,
      month_number,
      page
    });

    return { total, has_more, expenses };
  }

  @Query(() => ExpensesTotalsResponse)
  async getMonthExpensesValues(
    @Arg('data') {
      month_number,
      end_day,
    }: GetMonthExpensesValueInput
  ): Promise<ExpensesTotalsResponse> {
    const prismaRepository = new ExpensesPrismaRepository();
    const getExpensesValues = new GetMonthsExpensesValuesService(prismaRepository);

    const { total, essentials, restoio } = await getExpensesValues.execute({
      month_number,
      end_day,
    });

    return { total, essentials, restoio }
  }
}