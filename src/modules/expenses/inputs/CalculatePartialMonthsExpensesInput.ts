import { InputType, Field } from 'type-graphql';

@InputType()
export class CalculatePartialMonthsExpensesInput {
  @Field(() => String, { nullable: true, description: 'format as yyyy/MM/dd or yyyy-MM-dd' })
  partial_calculation_end_date: string;
}