import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} from 'graphql';


import{
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from 'graphql-relay';

import * as twitterCli from '../twitter-cli';
import * as Weather from '../weather';

  class Store {};
  let store = new Store();
let nodeDefs = nodeDefinitions(    
      (globalId) => {
        let {type} = fromGlobalId(globalId);
        if(type === "Store"){
          return store;
        }
        return null;
      },
    
      (obj) => {
        if(obj instanceof Store){
          return storeType;
        }
        return null;
      }
    );

let UserType = new GraphQLObjectType({
  name: 'TwitterUser',
  description: 'Twitter user',
  fields: () => ({
    created_at: { type: GraphQLString },
    description: { type: GraphQLString },
    id: { type: GraphQLID }, // GraphQLInt would return null
    screen_name: { type: GraphQLString },
    name: { type: GraphQLString },
    profile_image_url: { type: GraphQLString },
    url: { type: GraphQLString },
    location: {
      type: GraphQLString,
      description: 'Get location of user',
      //             user            args
      resolve: ({ screen_name: screen_name }) => twitterCli.getUser(screen_name)
    },
    tweets_count: {
      type: GraphQLInt,
      resolve: ({ statuses_count }) => statuses_count
    },
    weather: {
      type: GraphQLString,
      description: 'Get location of user',
      //             user            args
      resolve: ({ location: location }) => Weather.getTemperature(location)
    },
    followers_count: { type: GraphQLInt },
    tweets: {
      type: new GraphQLList(TweetType),
      description: 'Get a list of tweets for current user',
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 10
        }
      },
      //             user            args
      resolve: ({ id: user_id }, { limit }) => twitterCli.getTweets(user_id, limit)
    }
  })

});

let TweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: 'A tweet object',
  fields: () => ({
    id: { type: GraphQLID },
    created_at: { type: GraphQLString },
    text: { type: GraphQLString },
    retweet_count: { type: GraphQLInt },
    user: { type: UserType },
    retweets: {
      type: new GraphQLList(RetweetType),
      description: 'Get a list of retweets',
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 5
        }
      },
      //        passing integer 'id' here doesn't work surprisingly, had to use 'id_str'
      resolve: ({ id_str: tweetId }, { limit }) => twitterCli.getRetweets(tweetId, limit)
    }
  })
});

let RetweetType = new GraphQLObjectType({
  name: 'Retweet',
  description: 'Retweet of a tweet',
  fields: () => ({
    id: { type: GraphQLID },
    created_at: { type: GraphQLString },
    in_reply_to_tweet_id: {
      type: GraphQLString,
      resolve: ({ in_reply_to_status_id }) => in_reply_to_status_id
    },
    in_reply_to_user_id: { type: GraphQLInt },
    in_reply_to_screen_name: { type: GraphQLString },
    retweeted_status: { type: TweetType },
    user: { type: UserType }
  })
});

let viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    tweet: {
      type: new GraphQLList(TweetType),
      resolve: (viewer) => viewer,
    },
  },
});

let storeType = new GraphQLObjectType({
      name: 'Store',
      fields: () => ({
        id: globalIdField("Store"),
        search: {
          type: viewerType,
          id: globalIdField("Search"),
          args: {
            q:{
              type: GraphQLString,
              description:"A UTF-8, URL-encoded search query of 500 characters maximum, including operators. Queries may additionally be limited by complexity."
            },
            count: {
              type: GraphQLInt,
              description: "The number of tweets to return per page, up to a maximum of 100. This was formerly the “rpp” parameter in the old Search API."
            }
          },
          resolve: (_,args) => {
            return twitterCli.searchTweets(args)
          }
        },
      
      }),
      interfaces:[nodeDefs.nodeInterface]  
  });



export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: nodeDefs.nodeField,
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    })
});
