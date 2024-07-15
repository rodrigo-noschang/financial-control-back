import { ICategoriesRepository } from "../repositories/interface/ICategoriesRepository";

interface IRequest {
  id: string;
}

export class DeleteCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute({ id }: IRequest): Promise<boolean> {
    await this.categoriesRepository.delete(id);

    return true;
  }
}