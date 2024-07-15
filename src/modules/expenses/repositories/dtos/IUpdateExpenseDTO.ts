export interface IUpdateExpenseDTO {
  id: string;
  category_id?: string;
  observation?: string;
  amount?: number;
  date?: Date;
  essential?: boolean;
  recurrent?: boolean;
}