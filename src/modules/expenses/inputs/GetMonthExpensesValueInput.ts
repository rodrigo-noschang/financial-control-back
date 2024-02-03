import { Field, InputType } from "type-graphql";

@InputType()
export class GetMonthExpensesValueInput {
  @Field(() => Number)
  month_number: number;

  @Field(() => Number, { nullable: true })
  end_date: number;
}