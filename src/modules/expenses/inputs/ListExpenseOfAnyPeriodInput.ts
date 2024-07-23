import { InputType, Field } from 'type-graphql';

@InputType()
export class ListExpenseOfAnyPeriodInput {
  @Field(() => String, { description: 'format yyyy/MM/dd' })
  start_date: string;

  @Field(() => String, { description: 'format yyyy/MM/dd' })
  end_date: string;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  essentials_only: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  rest_only: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  recurrent_only: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  non_recurrent_only: boolean;
}