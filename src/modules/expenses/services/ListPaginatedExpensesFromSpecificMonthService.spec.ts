import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryExpensesRepository } from '../repositories/test/InMemoryExpensesRepository';

import { ICreateExpenseDTO } from '../repositories/dtos/ICreateExpenseDTO';
import { ListPaginatedExpensesFromSpecificMonthService } from './ListPaginatedExpensesFromSpecificMonthService';

let expensesRepository: InMemoryExpensesRepository;
let sut: ListPaginatedExpensesFromSpecificMonthService;

const mockedExpense: ICreateExpenseDTO = {
  amount: 123,
  category_id: 'categoria',
  date: new Date('2024/05/03'),
  essential: true,
  recurrent: true,
}

describe('List Paginated Past Expenses Service', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new ListPaginatedExpensesFromSpecificMonthService(expensesRepository);
  });

  it('should find expense in same month', async () => {
    await expensesRepository.create(mockedExpense);

    const { total, has_more, expenses } = await sut.execute({
      specific_month_date: '2024/05/10'
    });

    expect(total).toBe(1);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(1);
    expect(expenses[0].formatted_date).toEqual('03/05/2024');
  });

  it('should not find expense in same month', async () => {
    await expensesRepository.create(mockedExpense);

    const { total, has_more, expenses } = await sut.execute({
      specific_month_date: '2024/06/10'
    });

    expect(total).toBe(0);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(0);
  });

  it('should paginate expenses (page 1)', async () => {
    for (let i = 1; i <= 30; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        date: i <= 20 ? new Date('2024/05/12') : new Date('2024/06/10'),
        category_id: `${mockedExpense.category_id}-${i}`
      });
    }

    const { total, has_more, expenses } = await sut.execute({
      specific_month_date: '2024/05/05',
      page: 1,
    });

    expect(total).toBe(20);
    expect(has_more).toBe(true);
    expect(expenses).toHaveLength(15);
    expect(expenses[14].category_id).toBe('categoria-15');
  });

  it('should paginate expenses (page 2)', async () => {
    for (let i = 1; i <= 30; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        date: i <= 20 ? new Date('2024/05/12') : new Date('2024/06/10'),
        category_id: `${mockedExpense.category_id}-${i}`
      });
    }

    const { total, has_more, expenses } = await sut.execute({
      specific_month_date: '2024/05/05',
      page: 2,
    });

    expect(total).toBe(20);
    expect(has_more).toBe(false);
    expect(expenses).toHaveLength(5);
    expect(expenses[4].category_id).toBe('categoria-20');
  });

  it('should order expenses from most recent older', async () => {
    for (let i = 1; i <= 20; i++) {
      await expensesRepository.create({
        ...mockedExpense,
        date: new Date(`2024/03/${i}`),
      });
    }

    const { expenses } = await sut.execute({
      specific_month_date: '2024/03/25',
      page: 1,
    });

    expect(expenses[0].formatted_date).toBe('20/03/2024');
  })
});