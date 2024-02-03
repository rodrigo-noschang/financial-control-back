import { Category as CategoryP } from '@prisma/client';

export interface ICategoriesRepository {
  create(name: string): Promise<CategoryP>;
}