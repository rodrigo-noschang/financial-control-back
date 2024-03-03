import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MonthExpensesCalculation {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  essentials: number;

  @Field(() => Number)
  rest: number;
}