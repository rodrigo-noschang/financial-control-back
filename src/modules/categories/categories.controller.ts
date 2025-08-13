import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CreateCategoryFacade } from "./facades/CreateCategoryFacade";
import { ListCategoriesFacade } from "./facades/ListCategoriesFacade";

import { IListCategoriesResponse } from "./dtos/responses/listCategoriesResponse";
import { ICreateCategoryBodyDTO } from "./dtos/requests/createCategoryBody";
import { ICreateCategoryResponse } from "./dtos/responses/createCategoryResponse";
import { ListCategoriesQueryDTO } from "./dtos/requests/listCategoriesQuery";

@Controller("/category")
export class CategoriesController {
  constructor(
    private readonly createCategoryFacade: CreateCategoryFacade,
    private readonly listCategoriesFacade: ListCategoriesFacade,
  ) {}

  @Get()
  async listCategories(
    @Query() query: ListCategoriesQueryDTO,
  ): Promise<IListCategoriesResponse> {
    const { page, page_size, search } = query;

    const categories = await this.listCategoriesFacade.execute(
      page,
      page_size,
      search,
    );

    return { categories };
  }

  @Post()
  async createCategory(
    @Body() data: ICreateCategoryBodyDTO,
  ): Promise<ICreateCategoryResponse> {
    const category = await this.createCategoryFacade.execute(data);
    return { category };
  }
}
