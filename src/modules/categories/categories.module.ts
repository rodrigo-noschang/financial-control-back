import { Module } from "@nestjs/common";

import { CategoriesController } from "./categories.controller";

import { CreateCategoryFacade } from "./facades/CreateCategoryFacade";
import { ListCategoriesFacade } from "./facades/ListCategoriesFacade";

import { CreateCategoryService } from "./services/CreateCategoryService";
import { ListCategoriesService } from "./services/ListCategoriesService";
import { FindCategoryByNameService } from "./services/FindCategoryByNameService";

import { CategoriesRepository } from "./categories.repository";

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    CreateCategoryFacade,
    ListCategoriesFacade,

    CreateCategoryService,
    ListCategoriesService,
    FindCategoryByNameService,

    CategoriesRepository,
  ],
})
export class CategoriesModule {}
