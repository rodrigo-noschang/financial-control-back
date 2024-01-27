import { Query, Resolver } from "type-graphql";

@Resolver()
export class TestResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'hello world';
  }
}