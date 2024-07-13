import { Category } from '@prisma/client';

export interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  countAll(): Promise<number>;
  listPaginated(page: number): Promise<Category[]>;
}