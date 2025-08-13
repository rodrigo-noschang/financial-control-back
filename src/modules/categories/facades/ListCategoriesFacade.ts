import { Injectable } from "@nestjs/common";
import { Category } from "generated/prisma";

import { ListCategoriesService } from "../services/ListCategoriesService";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";

@Injectable()
export class ListCategoriesFacade {
  constructor(private listCategoriesService: ListCategoriesService) {}

  async execute(
    page: number = DEFAULT_PAGE,
    page_size: number = DEFAULT_PAGE_SIZE,
    search?: string,
  ): Promise<Category[]> {
    const sanitizedSearch = search ? search.trim() : search;

    const categories = await this.listCategoriesService.execute(
      page,
      page_size,
      sanitizedSearch,
    );
    return categories;
  }
}
