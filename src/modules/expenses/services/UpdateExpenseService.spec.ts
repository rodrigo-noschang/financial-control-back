import { beforeEach, describe, expect, it } from "vitest";

import { UpdateExpenseService } from "./UpdateExpenseService";
import { InMemoryExpensesRepository } from "../repositories/test/InMemoryExpensesRepository";
import { InMemoryCategoriesRepository } from "../../categories/repositories/test/InMemoryCategoriesRepository";
import { CreateExpenseService } from "./CreateExpenseService";
import { AppError } from "../../../errors";

interface ICreateExpenseInService {
  category_id: string;
  amount: number;
  observation?: string;
  date: string;
  essential: boolean;
  recurrent: boolean;
}

let sut: UpdateExpenseService;
let expensesRepository: InMemoryExpensesRepository;
let categoriesRepository: InMemoryCategoriesRepository;

let createExpenseService: CreateExpenseService;

const mockedExpense: ICreateExpenseInService = {
  amount: 123,
  category_id: 'Categoria A',
  date: '2024/05/03',
  essential: true,
  recurrent: true,
}

describe('Update Expense Service', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    categoriesRepository = new InMemoryCategoriesRepository();

    sut = new UpdateExpenseService(expensesRepository, categoriesRepository);
    createExpenseService = new CreateExpenseService(expensesRepository); // Auxiliar
  });

  it('should update expense', async () => {
    await categoriesRepository.create('Categoria A');

    const createdCategory = await createExpenseService.execute(mockedExpense);
    const newExpenseId = createdCategory.id;

    const updatedExpense = await sut.execute({
      id: newExpenseId,
      amount: 111,
    });

    expect(updatedExpense.id).toBe(newExpenseId);
    expect(updatedExpense.amount).toBe(111);
    expect(updatedExpense.essential).toBe(true);
    expect(updatedExpense.recurrent).toBe(true);
  });

  it('throw error if expense is not found', async () => {
    const updateExpenseResponse = sut.execute({
      id: 'non-existing-expense',
      amount: 111,
    });

    expect(updateExpenseResponse).rejects.toThrowError('Despesa não encontrada');
  });

  it('should throw error if category does not exist', async () => {
    const createdCategory = await createExpenseService.execute(mockedExpense);
    const newExpenseId = createdCategory.id;

    const updatedExpenseResponse = sut.execute({
      id: newExpenseId,
      amount: 111,
      category_id: 'non-existing-category'
    });

    expect(updatedExpenseResponse).rejects.toThrow(AppError);
  });

  it('should throw error if date is invalid', async () => {
    const createdCategory = await createExpenseService.execute(mockedExpense);
    const newExpenseId = createdCategory.id;

    const updatedExpenseResponse = sut.execute({
      id: newExpenseId,
      amount: 111,
      date: '2023/14/33',
    });

    expect(updatedExpenseResponse).rejects.toThrowError('Formato de data inválido');
  });
})