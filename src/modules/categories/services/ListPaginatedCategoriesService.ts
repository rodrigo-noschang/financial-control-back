import { Category } from '@prisma/client';

import { ICategoriesRepository } from "../repositories/interface/ICategoriesRepository";
import { PAGE_LIMIT } from '../../expenses/repositories/interfaces/IExpensesRepository';

interface IRequest {
  page: number;
  search?: string;
}

interface IResponse {
  total: number;
  has_more: boolean;
  categories: Category[]
}

export class ListPaginatedCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute({ page, search }: IRequest): Promise<IResponse> {
    const categoriesCount = await this.categoriesRepository.countAll(search);

    const categoriesList = await this.categoriesRepository.listPaginated({
      page,
      search,
    });

    return {
      categories: categoriesList,
      total: categoriesCount,
      has_more: (PAGE_LIMIT * page) < categoriesCount,
    };
  }
}