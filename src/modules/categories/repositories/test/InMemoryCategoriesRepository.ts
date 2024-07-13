import { Category as CategoryP } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { ICategoriesRepository } from "../interface/ICategoriesRepository";
import { PAGE_LIMIT } from '../../../expenses/repositories/interfaces/IExpensesRepository';

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  private inMemoryDatabase: CategoryP[] = [];

  async create(name: string): Promise<CategoryP> {
    const newCategory: CategoryP = {
      id: randomUUID(),
      name,
    };

    this.inMemoryDatabase.push(newCategory);

    return newCategory;
  }

  async countAll(): Promise<number> {
    const categoriesCount = this.inMemoryDatabase.length;

    return categoriesCount;
  }

  async listPaginated(page: number): Promise<CategoryP[]> {
    const skip = PAGE_LIMIT * (page - 1);
    const take = PAGE_LIMIT * page;

    const sortedCategories = this.inMemoryDatabase.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    const paginatedCategories = sortedCategories.slice(skip, take);

    return paginatedCategories;
  }
}