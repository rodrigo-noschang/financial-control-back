import { Injectable } from "@nestjs/common";
import { endOfMonth, startOfMonth } from "date-fns";

import { ExpensesRepository } from "../expenses.repository";

import { GetExpensesSummaryQueryDTO } from "../dtos/requests/getExpensesSummaryQuery";
import { IGetExpensesSummaryResponse } from "../dtos/response/GetExpensesSummaryResponse";

@Injectable()
export class GetExpensesSummaryService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute(
    data: GetExpensesSummaryQueryDTO,
  ): Promise<IGetExpensesSummaryResponse> {
    const startDate = data.start_date ?? startOfMonth(new Date());
    const endDate = data.end_date ?? endOfMonth(new Date());

    const { essentials, rest } =
      await this.expensesRepository.getExpensesSummary({
        start_date: startDate,
        end_date: endDate,
      });

    const total = essentials + rest;

    return { essentials, rest, total };
  }
}
