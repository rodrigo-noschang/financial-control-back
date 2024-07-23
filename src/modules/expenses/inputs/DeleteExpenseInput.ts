import { InputType, Field } from 'type-graphql';

@InputType()
export class DeleteExpenseInput {
  @Field(() => String)
  id: string;
}