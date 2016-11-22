import express from 'express';
import graphQLHTTP from 'express-graphql';
import staticData from './staticdata';
import schema from './gql-schema/schema.js';
import constants from './constants';

const app = express();

app.use('/graphql',graphQLHTTP({
	schema: schema,
	graphiql: true
}))

app.get('/people/:id', function(req, res) {
	res.send(staticData[req.params.id]);
});

app.listen(constants.devPort, function() {
	console.log(`Started @${constants.devPort}`);
});
