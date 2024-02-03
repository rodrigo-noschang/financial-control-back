import path from "path";
import { BuildSchemaOptions } from "type-graphql";

import { ExpensesResolver } from "../modules/expenses/resolvers/ExpensesResolver";
import { CategoriesResolver } from "../modules/categories/resolvers/CategoriesResolver";

export const schemaConfig: BuildSchemaOptions = {
  resolvers: [
    ExpensesResolver,
    CategoriesResolver,
  ],
  emitSchemaFile: path.resolve(__dirname, '..', 'schema', 'schema.gql'),
}