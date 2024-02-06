import { Field, InputType } from "type-graphql";


@InputType()
export class ListExpensesPaginatedInput {
  @Field(() => Number, { nullable: true })
  month_number: number;

  @Field(() => Number, { nullable: true })
  end_day: number;
}