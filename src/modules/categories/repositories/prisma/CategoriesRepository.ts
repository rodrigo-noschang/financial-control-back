import { Category as CategoryP } from '@prisma/client';

import { prisma } from "../../../../db/prisma";
import { ICategoriesRepository } from "../interface/ICategoriesRepository";
import { PAGE_LIMIT } from '../../../expenses/repositories/interfaces/IExpensesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<CategoryP> {
    const newCategory = await prisma.category.create({
      data: { name },
    });

    return newCategory;
  }

  async countAll(): Promise<number> {
    const categoriesCount = await prisma.category.count();

    return categoriesCount;
  }

  async listPaginated(page: number): Promise<CategoryP[]> {
    const skip = PAGE_LIMIT * (page - 1);
    const take = PAGE_LIMIT * page;

    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      skip,
      take,
    });

    return categories;
  }
}