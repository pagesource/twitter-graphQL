import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

const BASE_URL = "http://localhost:3000";

import fetch from 'node-fetch';

function getPersonByUrl(relativeUrl) {
	return fetch(`${BASE_URL}${relativeUrl}`,)
				.then(res => res.json())
				.then(json => json)
}

const PersonType = new GraphQLObjectType({
	name: 'Person',
	description: 'Person desc',
	fields: () => ({
		firstName: {
			type: GraphQLString,
			resolve: (person) => (person.first_name)
		},
		lastName: {
			type: GraphQLString,
			resolve: (person) => (person.last_name)
		},
		email: { type: GraphQLString },
		username: { type: GraphQLString },
		id: { type: GraphQLString },
		friends: {
			type: new GraphQLList(PersonType),
			resolve: (person) => person.friends.map(function(item) {return getPersonByUrl(item)})
		}
	})
})

const QueryType = new GraphQLObjectType({
	name: "Query",
	description: "...",
	fields: () => ({
		person: {
			type: PersonType,
			args: {
				id: { type: GraphQLString }
			},
			resolve: (root, args) => getPersonByUrl(`/people/${args.id}`)
		}
	})
})

export default new GraphQLSchema({
	query: QueryType
})
