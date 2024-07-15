import { beforeEach, describe, expect, it } from "vitest";

import { DeleteExpenseService } from "./DeleteExpenseService";
import { CreateExpenseService } from "./CreateExpenseService";

import { ICreateExpenseInService } from "./UpdateExpenseService.spec";
import { InMemoryExpensesRepository } from "../repositories/test/InMemoryExpensesRepository";

let sut: DeleteExpenseService;
let expensesRepository: InMemoryExpensesRepository;

let createExpenseService: CreateExpenseService;

const mockedExpense: ICreateExpenseInService = {
  amount: 123,
  category_id: 'Categoria A',
  date: '2024/05/03',
  essential: true,
  recurrent: true,
}

describe('Delete Expense Service', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository()
    sut = new DeleteExpenseService(expensesRepository);

    createExpenseService = new CreateExpenseService(expensesRepository);
  })

  it('should delete expense', async () => {
    const createdExpense = await createExpenseService.execute(mockedExpense);

    const expenseId = createdExpense.id;
    await sut.execute({ id: expenseId });

    const deletedExpense = await expensesRepository.findById(expenseId);

    expect(deletedExpense).toBe(null);
  })
})