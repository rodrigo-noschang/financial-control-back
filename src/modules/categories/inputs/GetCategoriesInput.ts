import { InputType, Field } from 'type-graphql';

@InputType()
export class GetCategoriesInput {
  @Field(() => String, { nullable: true })
  search: string;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;
}