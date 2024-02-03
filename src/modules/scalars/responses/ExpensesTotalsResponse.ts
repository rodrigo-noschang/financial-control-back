import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ExpensesTotalsResponse {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  essentials: number;

  @Field(() => Number)
  restoio: number;
}