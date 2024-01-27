import path from "path";
import { BuildSchemaOptions } from "type-graphql";

import { TestResolver } from "../modules/test/resolvers/TestResolver";


export const schemaConfig: BuildSchemaOptions = {
  resolvers: [
    TestResolver
  ],
  emitSchemaFile: path.resolve(__dirname, 'src', 'schema', 'schema.gql'),
}