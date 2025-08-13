import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Category } from "generated/prisma";

import { CreateCategoryService } from "../services/CreateCategoryService";

import { ICreateCategoryBodyDTO } from "../dtos/requests/createCategoryBody";
import { FindCategoryByNameService } from "../services/FindCategoryByNameService";

@Injectable()
export class CreateCategoryFacade {
  constructor(
    private createCategoryService: CreateCategoryService,
    private findCategoryByNameService: FindCategoryByNameService,
  ) {}

  async execute(data: ICreateCategoryBodyDTO): Promise<Category> {
    const existingCategory = await this.findCategoryByNameService.execute(
      data.name,
    );

    if (existingCategory) {
      throw new HttpException("Categoria já existe", HttpStatus.CONFLICT);
    }

    const category = await this.createCategoryService.execute(data);
    return category;
  }
}
