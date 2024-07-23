import { InputType, Field } from 'type-graphql';

@InputType()
export class CalculateExpensesOfAnyPeriodInput {
  @Field(() => String, { description: 'format yyyy/MM/dd' })
  start_date: string;

  @Field(() => String, { description: 'format yyyy/MM/dd' })
  end_date: string;
}