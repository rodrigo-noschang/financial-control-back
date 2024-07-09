import { startOfMonth, subMonths } from "date-fns";

import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";
import { validateDateUtil } from "../../../utils/validateDateUtil";

interface IRequest {
  partial_calculation_end_date?: string;
}

interface IResponse {
  total: number;
  essentials: number;
  rest: number;
}

export class CalculatePartialMonthsExpensesService {
  constructor(
    private expensesRepository: IExpensesRepository
  ) { }

  async execute({
    partial_calculation_end_date,
  }: IRequest): Promise<IResponse> {
    const today = new Date();
    const lastMonthToday = subMonths(today, 1);
    let partialCalculationEnd = lastMonthToday;

    if (partial_calculation_end_date) {
      const validatedDate = validateDateUtil(partial_calculation_end_date);
      partialCalculationEnd = validatedDate;
    }

    const partialCalculationStart = startOfMonth(partialCalculationEnd);

    const partialMonthsTotalExpenses = await this.expensesRepository.calculatePeriodTotalExpenses(
      partialCalculationStart,
      partialCalculationEnd
    );

    const partialMonthsEssentialsExpenses = await this.expensesRepository.calculatePeriodEssentialExpenses(
      partialCalculationStart,
      partialCalculationEnd
    );

    return {
      total: partialMonthsTotalExpenses,
      essentials: partialMonthsEssentialsExpenses,
      rest: partialMonthsTotalExpenses - partialMonthsEssentialsExpenses,
    };
  }
}