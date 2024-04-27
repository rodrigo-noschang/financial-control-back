import { InputType, Field } from 'type-graphql';

@InputType()
export class CalculateMonthsExpensesInput {
  @Field(() => Number)
  actual_month_number: number;

  @Field(() => Number)
  year: number;
}