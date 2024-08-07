import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { ListPaginatedExpensesOfAnyPeriodService } from './ListPaginatedExpensesOfAnyPeriodService';
import { InMemoryExpensesRepository } from '../repositories/test/InMemoryExpensesRepository';
import { ICreateExpenseDTO } from '../repositories/dtos/ICreateExpenseDTO';

let sut: ListPaginatedExpensesOfAnyPeriodService
let expensesRepository: InMemoryExpensesRepository

const mockedExpense: ICreateExpenseDTO = {
  amount: 10,
  category_id: 'categoria',
  date: new Date(),
  essential: true,
  recurrent: true,
}

describe('List Paginated Expenses Of Any Period Service', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new ListPaginatedExpensesOfAnyPeriodService(expensesRepository);
  });

  it('should be able to get expense of a period', async () => {
    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 5,
      date: new Date('2024/05/10'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 15,
      date: new Date('2024/08/10'),
    });

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/01',
      end_date: '2024/05/15',
      page: 1,
    });

    expect(total).toBe(1);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(1);
    expect(expenses[0].amount).toBe(5);
  });

  it('should get expenses in dates limits', async () => {
    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 5,
      date: new Date('2024/05/10'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 15,
      date: new Date('2024/05/15'),
    });

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
      page: 1,
    });

    expect(total).toBe(2);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(2);
    expect(expenses[0].amount).toBe(15);
    expect(expenses[1].amount).toBe(5);
  });

  it('should get expenses with pagination', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: true,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 15,
      date: new Date('2024/05/12'),
    });

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
      page: 1,
    });

    expect(total).toBe(21);
    expect(has_more).toBe(true);
    expect(expenses).toHaveLength(15);
    expect(expenses[0].amount).toBe(15);
  });

  it('should list only essentials', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
      essentials_only: true,
      page: 1,
    });

    expect(total).toBe(10);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(10);
    expect(expenses[0].essential).toBe(true);
  });

  it('should list only rests', async () => {
    for (let i = 0; i < 35; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
      rest_only: true,
      page: 1,
    });

    expect(total).toBe(17);
    expect(has_more).toBe(true);
    expect(expenses).toHaveLength(15);
    expect(expenses[0].essential).toBe(false);
  });

  it('should ignore filters if essentials_only and rest_only are both true', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
      rest_only: true,
      essentials_only: true,
      page: 1,
    });

    expect(total).toBe(20);
    expect(has_more).toBe(true);
    expect(expenses).toHaveLength(15);
  });

  it('should list only recurrent expenses', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        recurrent: i % 2 !== 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/11',
      recurrent_only: true,
    });

    expect(total).toBe(10);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(10);
  });

  it('should list only non recurrent expenses', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        recurrent: i % 2 !== 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/11',
      non_recurrent_only: true,
    });

    expect(total).toBe(10);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(10);
  });

  it('should ignore filters if recurrent_only and non_recurrent_only are both true', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        recurrent: i % 2 !== 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/11',
      recurrent_only: true,
      non_recurrent_only: true,
    });

    expect(total).toBe(20);
    expect(has_more).toBe(true);
    expect(expenses).toHaveLength(15);
  });

  it('should apply filter for both recurrent and essentials', async () => {
    for (let i = 0; i < 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        recurrent: i % 4 === 0,
        amount: 5,
        date: new Date('2024/05/10'),
      });
    }

    const { expenses, has_more, total } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/11',
      recurrent_only: true,
      essentials_only: true,
    });

    expect(total).toBe(5);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(5);
  })
});