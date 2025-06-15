export interface IListExpensesRequest {
  page: number;
  page_size: number;
  search?: string;
  start_date?: Date;
  end_date?: Date;
}
