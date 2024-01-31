import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateExpenseInput {
  @Field(() => String)
  category_id: string;

  @Field(() => Number)
  amount: number;

  @Field(() => String, { nullable: true })
  observation: string;

  @Field(() => String)
  date: string;

  @Field(() => Boolean)
  essential: boolean;

  @Field(() => Boolean)
  recurrent: boolean;
}