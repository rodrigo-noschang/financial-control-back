import { Category } from "generated/prisma";
import { Injectable } from "@nestjs/common";

import { CategoriesRepository } from "../categories.repository";

@Injectable()
export class FindCategoryByNameService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(name: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findCategoryByName(name);
    return category;
  }
}
