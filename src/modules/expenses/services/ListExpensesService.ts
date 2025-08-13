import { Injectable } from "@nestjs/common";
import { endOfMonth, startOfMonth } from "date-fns";

import { extractPaginationInfo } from "src/utils/extractPaginationInfo.";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/defaults/pagination";

import { ExpensesRepository } from "../expenses.repository";
import { ListExpensesQueryDTO } from "../dtos/requests/listExpensesQuery";
import { IListExpensesResponse } from "../dtos/response/listExpensesResponse";

@Injectable()
export class ListExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute(data: ListExpensesQueryDTO): Promise<IListExpensesResponse> {
    const { page = DEFAULT_PAGE, page_size = DEFAULT_PAGE_SIZE, search } = data;

    const startDate = data.start_date ?? startOfMonth(new Date());
    const endDate = data.end_date ?? endOfMonth(new Date());

    const expensesCount = await this.expensesRepository.countExpenses({
      page,
      page_size,
      start_date: startDate,
      end_date: endDate,
      search,
    });

    const { has_next_page, has_previous_page } = extractPaginationInfo({
      page: page,
      page_size: page_size,
      total: expensesCount,
    });

    const expenses = await this.expensesRepository.listExpenses({
      page,
      page_size,
      start_date: startDate,
      end_date: endDate,
      search,
    });

    return {
      expenses,
      pagination: {
        has_next_page,
        has_previous_page,
        total: expensesCount,
        page,
        page_size,
      },
    };
  }
}
