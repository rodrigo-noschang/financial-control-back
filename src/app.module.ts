import { Module } from "@nestjs/common";

import { CategoriesModule } from "./modules/categories/categories.module";
import { PrismaModule } from "./modules/database/prisma/prisma.module";
import { ExpenseModule } from "./modules/expenses/expenses.module";

@Module({
  imports: [PrismaModule, CategoriesModule, ExpenseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
