import { Module } from "@nestjs/common";

import { CategoriesController } from "./modules/categories/categories.controller";

import { PrismaService } from "./modules/database/prisma/prisma.service";
import { CategoriesService } from "./modules/categories/categories.service";

import { CategoriesRepository } from "./modules/categories/categories.repository";
import { ExpensesController } from "./modules/expenses/expenses.controller";
import { ExpensesService } from "./modules/expenses/expenses.service";
import { ExpensesRepository } from "./modules/expenses/expenses.repository";

@Module({
  imports: [],
  controllers: [CategoriesController, ExpensesController],
  providers: [
    CategoriesService,
    PrismaService,
    CategoriesRepository,
    ExpensesService,
    ExpensesRepository,
  ],
})
export class AppModule {}
