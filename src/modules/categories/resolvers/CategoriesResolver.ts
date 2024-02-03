import { Arg, Mutation, Resolver } from "type-graphql";
import { Category as CategoryP } from '@prisma/client';

import { Category } from "../entities/Category";
import { CreateCategoryService } from "../services/CreateCategoryService";
import { CategoriesRepository } from "../repositories/prisma/CategoriesRepository";

@Resolver()
export class CategoriesResolver {
  @Mutation(() => Category)
  async createCategory(
    @Arg('name') name: string
  ): Promise<CategoryP> {
    const prismaRepository = new CategoriesRepository();
    const createCategory = new CreateCategoryService(prismaRepository);

    const newCategory = createCategory.execute({ name });

    return newCategory;
  }
}