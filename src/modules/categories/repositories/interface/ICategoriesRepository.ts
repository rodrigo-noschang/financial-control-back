import { Category } from '@prisma/client';
import { IListPaginatedCategoriesDTO } from '../dtos/IListPaginatedCategoriesDTO';

export interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  countAll(search?: string): Promise<number>;
  listPaginated(data: IListPaginatedCategoriesDTO): Promise<Category[]>;
}