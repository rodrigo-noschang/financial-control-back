export interface ICreateExpenseDTO {
  category_id: string;
  amount: number;
  observation?: string;
  date: Date;
  essential: boolean;
  recurrent: boolean;
}