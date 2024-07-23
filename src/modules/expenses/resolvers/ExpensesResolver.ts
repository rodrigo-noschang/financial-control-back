import { Expense } from '../entities/Expense';
import { Expense as ExpenseP } from '@prisma/client';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateExpenseInput } from '../inputs/CreateExpenseInput';
import { ExpensesPrismaRepository } from '../repositories/prisma/ExpensesRepository';

import { CreateExpenseService } from '../services/CreateExpenseService';
import { ListPaginatedPastExpensesService } from '../services/ListPaginatedPastExpensesService';

import { PaginatedExpenseResponse } from '../scalars/responses/PaginatedExpenseResponse';
import { MonthExpensesCalculation } from '../scalars/responses/MonthExpensesCalculation';
import CalculateSpecificMonthsExpensesService from '../services/CalculateSpecificMonthsExpensesService';
import { CalculatePartialMonthsExpensesInput } from '../inputs/CalculatePartialMonthsExpensesInput';
import { CalculatePartialMonthsExpensesService } from '../services/CalculatePartialMonthsExpensesService';
import { CalculateMonthsExpensesInput } from '../inputs/CalculateMonthsExpensesInput';
import { ListExpenseOfAnyPeriodInput } from '../inputs/ListExpenseOfAnyPeriodInput';
import { ListPaginatedExpensesOfAnyPeriodService } from '../services/ListPaginatedExpensesOfAnyPeriodService';
import { IPaginatedExpenseResponseDTO } from '../repositories/dtos/IPaginatedExpenseResponseDTO';
import { CalculateExpensesOfAnyPeriodInput } from '../inputs/CalculateExpensesOfAnyPeriodInput';
import { ExpensesCalculation } from '../scalars/responses/ExpensesCalculation';
import { IExpensesCalculationDTO } from '../repositories/dtos/IExpensesCalculationDTO';
import CalculateExpensesOfAnyPeriodService from '../services/CalculateExpensesOfAnyPeriodService';
import { UpdateExpenseInput } from '../inputs/UpdateExpenseInput';
import { UpdateExpenseService } from '../services/UpdateExpenseService';
import { CategoriesRepository } from '../../categories/repositories/prisma/CategoriesRepository';
import { DeleteExpenseInput } from '../inputs/DeleteExpenseInput';
import { DeleteExpenseService } from '../services/DeleteExpenseService';

@Resolver()
export class ExpensesResolver {
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

  // DE TUDO, provavelmente só vai usar essas daqui pra baixo (joia)
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
  async listExpenseOfAnyPeriod(
    @Arg('data') {
      start_date,
      end_date,
      page,
      essentials_only,
      non_recurrent_only,
      recurrent_only,
      rest_only,
    }: ListExpenseOfAnyPeriodInput
  ): Promise<IPaginatedExpenseResponseDTO> {
    const expenseRepository = new ExpensesPrismaRepository();
    const listExpenseOfAnyPeriodService = new ListPaginatedExpensesOfAnyPeriodService(expenseRepository);

    const {
      expenses,
      has_more,
      total,
    } = await listExpenseOfAnyPeriodService.execute({
      start_date,
      end_date,
      page,
      essentials_only,
      non_recurrent_only,
      recurrent_only,
      rest_only,
    });

    return {
      expenses,
      has_more,
      total,
    };
  }

  @Query(() => ExpensesCalculation)
  async calculateExpensesOfAnyPeriod(
    @Arg('data') {
      start_date,
      end_date,
    }: CalculateExpensesOfAnyPeriodInput
  ): Promise<IExpensesCalculationDTO> {
    const expenseRepository = new ExpensesPrismaRepository();
    const calculateExpenseOfAnyPeriodService = new CalculateExpensesOfAnyPeriodService(expenseRepository);

    const {
      essentials,
      rest,
      total,
    } = await calculateExpenseOfAnyPeriodService.execute({
      start_date,
      end_date,
    });

    return {
      essentials,
      rest,
      total,
    }
  }

  @Mutation(() => Expense)
  async updateExpense(
    @Arg('data') {
      id,
      category_id,
      amount,
      date,
      essential,
      observation,
      recurrent,
    }: UpdateExpenseInput
  ): Promise<ExpenseP> {
    const expensesRepository = new ExpensesPrismaRepository();
    const categoriesRepository = new CategoriesRepository();
    const updateExpenseService = new UpdateExpenseService(
      expensesRepository,
      categoriesRepository
    );

    const updatedExpense = await updateExpenseService.execute({
      id,
      amount,
      category_id,
      date,
      essential,
      observation,
      recurrent,
    });

    return updatedExpense;
  }

  @Mutation(() => Boolean)
  async deleteExpense(
    @Arg('data') {
      id,
    }: DeleteExpenseInput
  ): Promise<boolean> {
    const expensesRepository = new ExpensesPrismaRepository();
    const deleteExpenseService = new DeleteExpenseService(expensesRepository);

    await deleteExpenseService.execute({
      id,
    });

    return true;
  }
}