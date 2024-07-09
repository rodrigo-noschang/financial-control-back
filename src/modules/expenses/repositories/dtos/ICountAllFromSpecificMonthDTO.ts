export interface ICountAllFromSpecificMonthDTO {
  from: Date;
  to: Date;
  essentials_only?: boolean;
  rest_only?: boolean;
}