import { Injectable } from "@nestjs/common";
import { Category } from "generated/prisma";

import { CategoriesRepository } from "../categories.repository";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";

@Injectable()
export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(
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
}
