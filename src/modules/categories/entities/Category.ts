import { ObjectType, Field } from 'type-graphql';
import { Expense } from '../../expenses/entities/Expense';

@ObjectType()
export class Category {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => [Expense], { nullable: true })
  expenses: Expense[];
}