import { Field, ObjectType } from "type-graphql";
import { Expense } from "../../entities/Expense";
import { ExpensesWithFormattedDate } from './ExpensesWithFormattedDate';

@ObjectType()
export class PaginatedExpenseResponse {
  @Field(() => Number)
  total: number;

  @Field(() => Boolean)
  has_more: boolean;

  @Field(() => [Expense])
  expenses: ExpensesWithFormattedDate[];
}