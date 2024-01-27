import 'reflect-metadata';

import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { schemaConfig } from './src/buildSchema';

async function main() {
	const schema = await buildSchema(schemaConfig);

	const server = new ApolloServer({
		schema,
	})

	const { url } = await startStandaloneServer(server, {
		listen: {
			port: 3030
		},
	})

	console.log(`Server running on ${url}...`);
}

main();