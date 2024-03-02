import { Category as CategoryP } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { ICategoriesRepository } from "../interface/ICategoriesRepository";

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
}