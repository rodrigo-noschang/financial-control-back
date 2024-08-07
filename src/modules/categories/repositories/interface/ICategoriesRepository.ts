import { Category } from '@prisma/client';
import { IListPaginatedCategoriesDTO } from '../dtos/IGetCategoriesDTO';

export interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  countAll(search?: string): Promise<number>;
  listPaginated(data: IListPaginatedCategoriesDTO): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  delete(id: string): Promise<boolean>;
}