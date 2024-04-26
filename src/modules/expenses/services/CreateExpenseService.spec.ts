import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryExpensesRepository } from '../repositories/test/InMemoryExpensesRepository';
import { CreateExpenseService } from './CreateExpenseService';

let expenseRepository: InMemoryExpensesRepository;
let sut: CreateExpenseService;

describe('Create Expense Service', () => {
  beforeEach(() => {
    expenseRepository = new InMemoryExpensesRepository();
    sut = new CreateExpenseService(expenseRepository);
  });

  it('should be able to create a new expense', async () => {
    const createdExpense = await sut.execute({
      amount: 123,
      category_id: 'category-01',
      date: '2024-03-01',
      essential: true,
      recurrent: true,
    });

    expect(createdExpense.id).toEqual(expect.any(String));
  })
})