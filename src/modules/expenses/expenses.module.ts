import { Module } from "@nestjs/common";

import { ExpensesController } from "./expenses.controller";

import { ListExpensesFacade } from "./facades/ListExpensesFacade";
import { CreateExpenseFacade } from "./facades/CreateExpenseFacade";
import { GetExpensesSummaryFacade } from "./facades/GetExpensesSummaryFacade";

import { ListExpensesService } from "./services/ListExpensesService";
import { CreateExpenseService } from "./services/CreateExpenseService";
import { GetExpensesSummaryService } from "./services/GetExpensesSummaryService";

import { ExpensesRepository } from "./expenses.repository";

@Module({
  controllers: [ExpensesController],
  providers: [
    ListExpensesFacade,
    CreateExpenseFacade,
    GetExpensesSummaryFacade,

    ListExpensesService,
    CreateExpenseService,
    GetExpensesSummaryService,

    ExpensesRepository,
  ],
})
export class ExpenseModule {}
