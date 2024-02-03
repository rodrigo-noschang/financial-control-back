import { Expense as ExpenseP } from '@prisma/client';
import { Field, ObjectType } from "type-graphql";
import { Expense } from "../../expenses/entities/Expense";

@ObjectType()
export class PaginatedExpenseResponse {
  @Field(() => Number)
  total: number;

  @Field(() => Boolean)
  has_more: boolean;

  @Field(() => [Expense])
  expenses: ExpenseP[];
}