import { Injectable } from "@nestjs/common";
import { Category } from "generated/prisma";
import { CategoriesRepository } from "./categories.repository";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";
import { ICreateCategoryRequest } from "./dtos/requests/createCategoryRequest";

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async listCategories(
    page: number = DEFAULT_PAGE,
    page_size: number = DEFAULT_PAGE_SIZE,
    search?: string,
  ): Promise<Category[]> {
    const categories = await this.categoriesRepository.listCategories(
      page,
      page_size,
      search,
    );
    return categories;
  }

  async createCategory(data: ICreateCategoryRequest): Promise<Category> {
    const category = await this.categoriesRepository.createCategory(data);
    return category;
  }
}
