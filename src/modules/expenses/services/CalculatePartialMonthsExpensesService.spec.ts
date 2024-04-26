import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryExpensesRepository } from "../repositories/test/InMemoryExpensesRepository";
import { CalculatePartialMonthsExpensesService } from "./CalculatePartialMonthsExpensesService";

import { ICreateExpenseDTO } from "../repositories/dtos/ICreateExpenseDTO";
import { AppError } from "../../../errors";

let expensesRepository: InMemoryExpensesRepository;
let sut: CalculatePartialMonthsExpensesService;

const mockedExpense: ICreateExpenseDTO = {
  amount: 10,
  category_id: 'categoria',
  date: new Date(),
  essential: true,
  recurrent: true,
}

describe('Calculate Partial Months Expenses', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    const date = new Date('2024/04/20');
    vi.setSystemTime(date);
  });

  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new CalculatePartialMonthsExpensesService(expensesRepository);
  });

  it('should be able to calculate last months expenses to this equivalent date', async () => {
    for (let i = 0; i < 5; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 == 0,
        date: new Date('2024/03/15'),
      });
    }

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/02/15'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/04/21'),
    });

    const { essentials, rest, total } = await sut.execute({});

    expect(total).toBe(50);
    expect(essentials).toBe(30);
    expect(rest).toBe(20);
  });

  it('should be able to calculate any months expenses to any equivalent date', async () => {
    for (let i = 0; i < 5; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 == 0,
        date: new Date('2024/01/12'),
      });
    }

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/02/15'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/04/21'),
    });

    const { essentials, rest, total } = await sut.execute({
      partial_calculation_end_date: '2024/01/13',
    });

    expect(total).toBe(50);
    expect(essentials).toBe(30);
    expect(rest).toBe(20);
  });

  it('should not be able to calculate partial expenses for invalid dates', async () => {
    for (let i = 0; i < 5; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 == 0,
        date: new Date('2024/01/12'),
      });
    }

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/02/15'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/04/21'),
    });

    const response = sut.execute({
      partial_calculation_end_date: '2024/01',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should return zeroed data if date is in the future', async () => {
    for (let i = 0; i < 5; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        essential: i % 2 == 0,
        date: new Date('2024/01/12'),
      });
    }

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/02/15'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      date: new Date('2024/04/21'),
    });

    const { essentials, rest, total } = await sut.execute({
      partial_calculation_end_date: '2024/10/01',
    });

    expect(total).toBe(0);
    expect(essentials).toBe(0);
    expect(rest).toBe(0);
  });
})