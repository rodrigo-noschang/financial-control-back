export interface IListPaginatedFromSpecificMonthDTO {
  from: Date;
  to: Date;
  essentials_only?: boolean;
  rest_only?: boolean;
  page: number;
}