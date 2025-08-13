import { Injectable } from "@nestjs/common";

import { ListExpensesService } from "../services/ListExpensesService";

import { ListExpensesQueryDTO } from "../dtos/requests/listExpensesQuery";
import { IListExpensesResponse } from "../dtos/response/listExpensesResponse";

@Injectable()
export class ListExpensesFacade {
  constructor(private readonly listExpensesService: ListExpensesService) {}

  async execute(data: ListExpensesQueryDTO): Promise<IListExpensesResponse> {
    const expenses = this.listExpensesService.execute(data);
    return expenses;
  }
}
