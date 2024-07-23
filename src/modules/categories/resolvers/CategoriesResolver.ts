import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category as CategoryP } from '@prisma/client';

import { Category } from "../entities/Category";
import { CreateCategoryService } from "../services/CreateCategoryService";
import { CategoriesRepository } from "../repositories/prisma/CategoriesRepository";
import { GetCategoriesInput } from "../inputs/GetCategoriesInput";
import { ListPaginatedCategoriesService } from "../services/ListPaginatedCategoriesService";
import { IGetCategoriesDTO } from "../repositories/dtos/IGetCategoriesDTO";
import { GetCategoriesResponse } from "../scalars/responses/GetCategoriesResponse";
import { DeleteCategoryService } from "../services/DeleteCategoryService";
import { DeleteCategoryInput } from "../inputs/DeleteCategoryInput";

@Resolver()
export class CategoriesResolver {
  @Mutation(() => Category)
  async createCategory(
    @Arg('name') name: string
  ): Promise<CategoryP> {
    const prismaRepository = new CategoriesRepository();
    const createCategory = new CreateCategoryService(prismaRepository);

    const newCategory = await createCategory.execute({ name });

    return newCategory;
  }

  @Query(() => GetCategoriesResponse)
  async getCategories(
    @Arg('data') {
      search,
      page,
    }: GetCategoriesInput
  ): Promise<IGetCategoriesDTO> {
    const categoriesRepository = new CategoriesRepository();
    const listCategoriesService = new ListPaginatedCategoriesService(categoriesRepository);

    const {
      categories,
      has_more,
      total,
    } = await listCategoriesService.execute({
      page,
      search,
    });

    return {
      total,
      has_more,
      categories,
    }
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('data') { id }: DeleteCategoryInput
  ): Promise<boolean> {
    const prismaRepository = new CategoriesRepository();
    const deleteCategory = new DeleteCategoryService(prismaRepository);

    await deleteCategory.execute({ id });

    return true;
  }
}