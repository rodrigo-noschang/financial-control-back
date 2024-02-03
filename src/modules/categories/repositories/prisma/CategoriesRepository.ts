import { Category as CategoryP } from '@prisma/client';

import { prisma } from "../../../../db/prisma";
import { ICategoriesRepository } from "../interface/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<CategoryP> {
    const newCategory = await prisma.category.create({
      data: { name },
    });

    return newCategory;
  }
}