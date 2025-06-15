import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CategoriesService } from "./categories.service";

import { IListCategoriesResponse } from "./dtos/responses/listCategoriesResponse";
import { ICreateCategoryBodyDTO } from "./dtos/requests/createCategoryBody";
import { ICreateCategoryResponse } from "./dtos/responses/createCategoryResponse";
import { ListCategoriesQueryDTO } from "./dtos/requests/listCategoriesQuery";

@Controller("/category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async listCategories(
    @Query() query: ListCategoriesQueryDTO,
  ): Promise<IListCategoriesResponse> {
    const { page, page_size, search } = query;

    const sanitizedSearch = search ? search.trim() : search;

    const categories = await this.categoriesService.listCategories(
      page,
      page_size,
      sanitizedSearch,
    );

    return { categories };
  }

  @Post()
  async createCategory(
    @Body() data: ICreateCategoryBodyDTO,
  ): Promise<ICreateCategoryResponse> {
    const category = await this.categoriesService.createCategory(data);
    return { category };
  }
}
