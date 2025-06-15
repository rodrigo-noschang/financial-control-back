import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CategoriesService } from "./categories.service";

import { IListCategoriesResponse } from "./dtos/responses/listCategoriesResponse";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";
import { ICreateCategoryRequest } from "./dtos/requests/createCategoryRequest";
import { ICreateCategoryResponse } from "./dtos/responses/createCategoryResponse";

@Controller("/category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async listCategories(
    @Query("page") page: number | undefined = DEFAULT_PAGE,
    @Query("page_size") page_size: number | undefined = DEFAULT_PAGE_SIZE,
    @Query("search") search: string | undefined,
  ): Promise<IListCategoriesResponse> {
    const searchQuery = search ? search.trim() : search;

    const categories = await this.categoriesService.listCategories(
      page,
      page_size,
      searchQuery,
    );

    return { categories };
  }

  @Post()
  async createCategory(
    @Body() data: ICreateCategoryRequest,
  ): Promise<ICreateCategoryResponse> {
    const category = await this.categoriesService.createCategory(data);
    return { category };
  }
}
