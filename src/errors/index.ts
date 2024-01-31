import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
  constructor(message: string) {
    super(message);
  }
}