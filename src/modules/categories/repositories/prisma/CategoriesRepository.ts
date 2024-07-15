import { Category as CategoryP } from '@prisma/client';

import { prisma } from "../../../../db/prisma";
import { ICategoriesRepository } from "../interface/ICategoriesRepository";
import { PAGE_LIMIT } from '../../../expenses/repositories/interfaces/IExpensesRepository';
import { IListPaginatedCategoriesDTO } from '../dtos/IListPaginatedCategoriesDTO';

export class CategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<CategoryP> {
    const newCategory = await prisma.category.create({
      data: { name },
    });

    return newCategory;
  }

  async countAll(search?: string): Promise<number> {
    let filter: any = {};

    if (search) {
      Object.assign(filter, {
        name: { contains: search, mode: 'insensitive' }
      });
    }

    const categoriesCount = await prisma.category.count({
      where: { ...filter }
    });

    return categoriesCount;
  }

  async listPaginated({
    page,
    search,
  }: IListPaginatedCategoriesDTO): Promise<CategoryP[]> {
    const skip = PAGE_LIMIT * (page - 1);
    const take = PAGE_LIMIT * page;

    let filter: any = {};

    if (search) {
      Object.assign(filter, {
        name: { contains: search, mode: 'insensitive' }
      });
    }

    const categories = await prisma.category.findMany({
      where: { ...filter },
      orderBy: { name: 'asc' },
      skip,
      take,
    });

    return categories;
  }

  async findById(id: string): Promise<CategoryP | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return category;
  }
}