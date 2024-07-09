import { beforeEach, describe, expect, it } from 'vitest';
import CalculateExpensesOfAnyPeriodService from './CalculateExpensesOfAnyPeriodService';
import { InMemoryExpensesRepository } from '../repositories/test/InMemoryExpensesRepository';
import { ICreateExpenseDTO } from '../repositories/dtos/ICreateExpenseDTO';

let sut: CalculateExpensesOfAnyPeriodService
let expensesRepository: InMemoryExpensesRepository

const mockedExpense: ICreateExpenseDTO = {
  amount: 10,
  category_id: 'categoria',
  date: new Date(),
  essential: true,
  recurrent: true,
}

describe('Calculate Expenses Of Any Period Service', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new CalculateExpensesOfAnyPeriodService(expensesRepository);
  });

  it('should be able to calculate expenses within period', async () => {
    await expensesRepository.create({
      ...mockedExpense,
      essential: false,
      amount: 5,
      date: new Date('2024/05/10'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 15,
      date: new Date('2024/05/15'),
    });

    const {
      essentials,
      rest,
      total,
    } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
    });

    expect(essentials).toBe(15);
    expect(rest).toBe(5);
    expect(total).toBe(20);
  });

  it('should be able to calculate expenses within period', async () => {
    await expensesRepository.create({
      ...mockedExpense,
      essential: false,
      amount: 5,
      date: new Date('2024/05/10'),
    });

    await expensesRepository.create({
      ...mockedExpense,
      essential: true,
      amount: 15,
      date: new Date('2024/05/15'),
    });

    const {
      essentials,
      rest,
      total,
    } = await sut.execute({
      start_date: '2024/05/10',
      end_date: '2024/05/15',
    });

    expect(essentials).toBe(15);
    expect(rest).toBe(5);
    expect(total).toBe(20);
  });
})