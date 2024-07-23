import { Category } from "@prisma/client";

export class IGetCategoriesDTO {
  total: number;
  has_more: boolean;
  categories: Category[];
}