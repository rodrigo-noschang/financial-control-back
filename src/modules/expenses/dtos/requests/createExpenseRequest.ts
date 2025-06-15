export interface ICreateExpenseRequest {
  category_id?: number;
  observation?: string;
  amount: number;
  date: Date;
  essential: boolean;
  recurrent: boolean;
  has_installments: boolean;
}
