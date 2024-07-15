import { ObjectType, Field } from 'type-graphql';
import { Category } from '../../categories/entities/Category';

@ObjectType()
export class Expense {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  category_id: string;

  @Field(() => String, { nullable: true })
  observation: string;

  @Field(() => Number)
  amount: number;

  @Field(() => Date)
  date: Date;

  @Field(() => Boolean)
  essential: boolean;

  @Field(() => Boolean)
  recurrent: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Category)
  category: Category;
}