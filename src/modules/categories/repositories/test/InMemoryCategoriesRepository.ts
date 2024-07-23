import { Category as CategoryP } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { ICategoriesRepository } from "../interface/ICategoriesRepository";
import { PAGE_LIMIT } from '../../../expenses/repositories/interfaces/IExpensesRepository';
import { IListPaginatedCategoriesDTO } from '../dtos/IGetCategoriesDTO';

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

  async countAll(search?: string): Promise<number> {
    if (search) {
      const searchedCategories = this.inMemoryDatabase.filter(category => {
        return category.name.toLowerCase().includes(search.toLowerCase());
      });

      return searchedCategories.length;
    }

    const categoriesCount = this.inMemoryDatabase.length;

    return categoriesCount;
  }

  async listPaginated({
    page,
    search,
  }: IListPaginatedCategoriesDTO): Promise<CategoryP[]> {
    const skip = PAGE_LIMIT * (page - 1);
    const take = PAGE_LIMIT * page;

    let categories = this.inMemoryDatabase.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    if (search) {
      categories = categories.filter(category => {
        return category.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    const paginatedCategories = categories.slice(skip, take);

    return paginatedCategories;
  }

  async findById(id: string): Promise<CategoryP | null> {
    const category = this.inMemoryDatabase.find(category => {
      return category.id === id;
    });

    return category ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const categoryIndex = this.inMemoryDatabase.findIndex(category => {
      return category.id === id;
    });

    if (categoryIndex === -1) return true;

    this.inMemoryDatabase.splice(categoryIndex, 1);
    return true;
  }
}