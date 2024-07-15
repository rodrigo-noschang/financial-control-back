import { IExpensesRepository } from "../repositories/interfaces/IExpensesRepository";

interface IRequest {
  id: string;
}

export class DeleteExpenseService {
  constructor(private expensesRepository: IExpensesRepository) { }

  async execute({ id }: IRequest): Promise<boolean> {
    await this.expensesRepository.delete(id);

    return true;
  }
}