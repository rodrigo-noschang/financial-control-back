import { Injectable } from "@nestjs/common";
import { Category } from "generated/prisma";

import { CreateCategoryService } from "../services/CreateCategoryService";

import { ICreateCategoryBodyDTO } from "../dtos/requests/createCategoryBody";

@Injectable()
export class CreateCategoryFacade {
  constructor(private createCategoryService: CreateCategoryService) {}

  async execute(data: ICreateCategoryBodyDTO): Promise<Category> {
    const category = await this.createCategoryService.execute(data);
    return category;
  }
}
