import { InputType, Field } from 'type-graphql';

@InputType()
export class DeleteCategoryInput {
  @Field(() => String)
  id: string
}