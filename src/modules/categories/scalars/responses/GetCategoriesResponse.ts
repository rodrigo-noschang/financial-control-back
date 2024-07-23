import { ObjectType, Field } from 'type-graphql';
import { Category } from '../../entities/Category';

@ObjectType()
export class GetCategoriesResponse {
  @Field(() => Number)
  total: number;

  @Field(() => Boolean)
  has_more: boolean;

  @Field(() => Category)
  categories: Category[];
}