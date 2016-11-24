import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID,
	GraphQLInt
} from 'graphql';

import {searchTweets} from '../twitter-cli';

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

let TweetType = new GraphQLObjectType({
  name        : 'Tweet',
  description : 'A tweet object',
  fields      : () => ({
    id            : { type: GraphQLID, resolve: (tweetdata) => (tweetdata.id) },
    created_at    : { type: GraphQLString, resolve: (tweetdata) => (tweetdata.created_at) },
    text          : { type: GraphQLString, resolve: (tweetdata) => (tweetdata.text) },
    retweet_count : { type: GraphQLInt, resolve: (tweetdata) => (tweetdata.retweet_count) }
  })
});


const QueryType = new GraphQLObjectType({
	name: "Twitter",
	description: "Make twitter get request",
	fields: () => ({
		tweets: {
			type: new GraphQLList(TweetType),
			args: {
				q: { type: GraphQLString }
			},
			resolve: (root, args) => searchTweets(args)
		}
	})
})

export default new GraphQLSchema({
	query: QueryType
})
