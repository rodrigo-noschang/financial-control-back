import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateExpenseInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  category_id: string;

  @Field(() => Number, { nullable: true })
  amount: number;

  @Field(() => String, { nullable: true })
  observation: string;

  @Field(() => String, { nullable: true })
  date: string;

  @Field(() => Boolean, { nullable: true })
  essential: boolean;

  @Field(() => Boolean, { nullable: true })
  recurrent: boolean;
}