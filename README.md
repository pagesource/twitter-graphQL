# graphql-twitter
Twitter API aggregator on top of GraphQL

### How to start the server?

```
$ git clone https://github.com/pagesource/twitter-graphQL.git
$ cd twitter-graphQL

//install dependencies
$ npm install

// Starts both the webpack server as well as the graphQL server on 2 different ports
$ npm start
```

## Access running App
http://localhost:3000/
It starts a webpack dev server and then for the graphql uses a proxy to fetch data.

## Access GraphiQL
http://localhost:8080/graphql
