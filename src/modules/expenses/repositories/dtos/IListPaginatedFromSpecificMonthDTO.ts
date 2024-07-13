export interface IListPaginatedFromSpecificMonthDTO {
  from: Date;
  to: Date;
  essentials_only?: boolean;
  rest_only?: boolean;
  recurrent_only?: boolean;
  non_recurrent_only?: boolean;
  page: number;
}