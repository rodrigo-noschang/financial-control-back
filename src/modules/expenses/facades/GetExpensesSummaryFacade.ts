import { Injectable } from "@nestjs/common";

import { GetExpensesSummaryService } from "../services/GetExpensesSummaryService";

import { GetExpensesSummaryQueryDTO } from "../dtos/requests/getExpensesSummaryQuery";
import { IGetExpensesSummaryResponse } from "../dtos/response/GetExpensesSummaryResponse";

@Injectable()
export class GetExpensesSummaryFacade {
  constructor(private getExpensesSummaryService: GetExpensesSummaryService) {}

  async execute(
    data: GetExpensesSummaryQueryDTO,
  ): Promise<IGetExpensesSummaryResponse> {
    const summary = this.getExpensesSummaryService.execute(data);

    return summary;
  }
}
