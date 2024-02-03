import { Category as CategoryP } from '@prisma/client';

import { ICategoriesRepository } from "../repositories/interface/ICategoriesRepository";

interface IRequest {
  name: string;
}

export class CreateCategoryService {
  constructor(
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute({ name }: IRequest): Promise<CategoryP> {
    const newCategoryId = await this.categoriesRepository.create(name);

    return newCategoryId;
  }
}