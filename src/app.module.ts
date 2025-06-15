import { Module } from "@nestjs/common";

import { CategoriesController } from "./modules/categories/categories.controller";

import { PrismaService } from "./modules/database/prisma/prisma.service";
import { CategoriesService } from "./modules/categories/categories.service";

import { CategoriesRepository } from "./modules/categories/categories.repository";

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, CategoriesRepository],
})
export class AppModule {}
