import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ExpensesCalculation {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  essentials: number;

  @Field(() => Number)
  rest: number;
}