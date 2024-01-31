import path from "path";
import { BuildSchemaOptions } from "type-graphql";

import { ExpensesResolver } from "../modules/expenses/resolvers/ExpensesResolver";

export const schemaConfig: BuildSchemaOptions = {
  resolvers: [
    ExpensesResolver,
  ],
  emitSchemaFile: path.resolve(__dirname, '..', 'schema', 'schema.gql'),
}