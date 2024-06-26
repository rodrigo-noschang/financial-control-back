import { Expense } from '../entities/Expense';
import { Expense as ExpenseP } from '@prisma/client';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateExpenseInput } from '../inputs/CreateExpenseInput';
import { ExpensesPrismaRepository } from '../repositories/prisma/ExpensesRepository';

import { CreateExpenseService } from '../services/CreateExpenseService';
import { ListPaginatedPastExpensesService } from '../services/ListPaginatedPastExpensesService';

import { PaginatedExpenseResponse } from '../../scalars/responses/PaginatedExpenseResponse';
import { MonthExpensesCalculation } from '../../scalars/responses/MonthExpensesCalculation';
import CalculateSpecificMonthsExpensesService from '../services/CalculateSpecificMonthsExpensesService';
import { CalculatePartialMonthsExpensesInput } from '../inputs/CalculatePartialMonthsExpensesInput';
import { CalculatePartialMonthsExpensesService } from '../services/CalculatePartialMonthsExpensesService';
import { CalculateMonthsExpensesInput } from '../inputs/CalculateMonthsExpensesInput';

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
  async listPaginatedLastExpenses(
    @Arg('page', { nullable: true, defaultValue: 1 }) page: number
  ) {
    const prismaRepository = new ExpensesPrismaRepository();
    const listPaginatedExpenses = new ListPaginatedPastExpensesService(prismaRepository);

    const paginatedExpenses = await listPaginatedExpenses.execute({
      page,
    });

    return paginatedExpenses;
  }

  @Query(() => MonthExpensesCalculation)
  async calculateMonthsExpense(
    @Arg('data', { nullable: true }) data: CalculateMonthsExpensesInput
  ) {
    const prismaRepository = new ExpensesPrismaRepository();
    const calculateMonthsExpense = new CalculateSpecificMonthsExpensesService(prismaRepository);

    const {
      essentials,
      rest,
      total,
    } = await calculateMonthsExpense.execute({
      actual_month_number: data.actual_month_number,
      year: data.year,
    });

    return {
      essentials,
      rest,
      total,
    };
  }

  @Query(() => MonthExpensesCalculation)
  async calculatePartialMonthsExpense(
    @Arg('data') {
      partial_calculation_end_date,
    }: CalculatePartialMonthsExpensesInput
  ) {
    const prismaRepository = new ExpensesPrismaRepository();
    const calculatePartialMonthsExpenses = new CalculatePartialMonthsExpensesService(prismaRepository);

    const { total, essentials, rest } = await calculatePartialMonthsExpenses.execute({
      partial_calculation_end_date
    });

    return {
      essentials,
      rest,
      total,
    };
  }
}