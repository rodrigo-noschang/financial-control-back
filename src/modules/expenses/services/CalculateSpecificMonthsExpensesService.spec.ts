import { describe, it, beforeEach, expect, vi, beforeAll } from 'vitest';
import { InMemoryExpensesRepository } from '../repositories/test/InMemoryExpensesRepository';
import CalculateSpecificMonthsExpenses from './CalculateSpecificMonthsExpensesService';

import { ICreateExpenseDTO } from '../repositories/dtos/ICreateExpenseDTO';

let expensesRepository: InMemoryExpensesRepository;
let sut: CalculateSpecificMonthsExpenses;

const mockedExpense: ICreateExpenseDTO = {
  amount: 10,
  category_id: 'categoria',
  date: new Date(),
  essential: true,
  recurrent: true,
}

describe('Calculate Specific Months Expenses', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new CalculateSpecificMonthsExpenses(expensesRepository);
  });

  beforeAll(() => {
    vi.useFakeTimers();
    const fakeDate = new Date('2024/04/27');
    vi.setSystemTime(fakeDate);
  })

  it('should calculate specific months expenses', async () => {
    for (let i = 1; i <= 30; i++) {
      const day = Math.min(i, 25);
      const month = Math.floor(i / 10) + 1;

      // Será essencial nos pares
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        amount: i * 10,
        date: new Date(`2024/${month}/${day}`),
      });
    }

    const { essentials, rest, total, } = await sut.execute({
      actual_month_number: 1,
      year: 2024,
    });

    expect(total).toBe(450);
    expect(essentials).toBe(200);
    expect(rest).toBe(250);
  });

  it('should calculate expenses of month from another year', async () => {
    for (let i = 1; i <= 30; i++) {
      const day = Math.min(i, 25);
      const month = Math.floor(i / 10) + 1;
      const year = 2022;

      // Será essencial nos pares
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        amount: i * 10,
        date: new Date(`${year}/${month}/${day}`),
      });
    }

    const { essentials, rest, total, } = await sut.execute({
      actual_month_number: 1,
      year: 2022,
    });

    expect(total).toBe(450);
    expect(essentials).toBe(200);
    expect(rest).toBe(250);
  });

  it('should get current month if some data is missing', async () => {
    for (let i = 1; i <= 30; i++) {

      // Será essencial nos pares
      const created = await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 === 0,
        amount: i * 10,
        date: new Date('2024/04/15'),
      });
    }

    const { essentials, rest, total, } = await sut.execute({
      year: 2022,
    });

    expect(total).toBe(4650);
    expect(essentials).toBe(2400);
    expect(rest).toBe(2250);
  });
})