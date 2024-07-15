import 'reflect-metadata';

import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { schemaConfig } from './src/buildSchema';
// import connectionToTypeorm from './ormconfig';

async function main() {
	const schema = await buildSchema(schemaConfig);
	// await connectionToTypeorm.initialize();

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