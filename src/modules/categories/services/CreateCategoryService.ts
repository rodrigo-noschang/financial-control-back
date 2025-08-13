import { Category } from "generated/prisma";
import { Injectable } from "@nestjs/common";

import { CategoriesRepository } from "../categories.repository";
import { ICreateCategoryBodyDTO } from "../dtos/requests/createCategoryBody";

@Injectable()
export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(data: ICreateCategoryBodyDTO): Promise<Category> {
    const category = await this.categoriesRepository.createCategory(data);
    return category;
  }
}
