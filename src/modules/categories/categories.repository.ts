import { Injectable } from "@nestjs/common";

import { Category } from "generated/prisma";
import { PrismaService } from "src/modules/database/prisma/prisma.service";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";
import { ICreateCategoryRequest } from "./dtos/requests/createCategoryRequest";

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async listCategories(
    page: number = DEFAULT_PAGE,
    page_size: number = DEFAULT_PAGE_SIZE,
    search?: string,
  ): Promise<Category[]> {
    const take = page * page_size;
    const skip = (page - 1) * page_size;

    const categories = await this.prisma.category.findMany({
      take,
      skip,
      where: {
        name: { contains: search ?? "", mode: "insensitive" },
      },
      orderBy: { name: "asc" },
    });

    return categories;
  }

  async createCategory(data: ICreateCategoryRequest): Promise<Category> {
    const { name } = data;

    const category = await this.prisma.category.create({
      data: { name },
    });

    return category;
  }
}
