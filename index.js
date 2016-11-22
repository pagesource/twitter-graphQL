import express from 'express';
import graphQLHTTP from 'express-graphql';

const app = express();

import schema from './schema';

app.use('/graphql',graphQLHTTP({
	schema: schema,
	graphiql: true
}))

var data = {
	1: {
		first_name: "Shafeeq",
		last_name: "Rahman",
		id: 1,
		email: "ShafeeqRahman1@gmail.com",
		username: "ShafeeqRahman",
		friends: [
			'/people/2',
			'/people/4'
		]
	},
	2: {
		first_name: "Shafeeq2",
		last_name: "Rahman2",
		id: 2,
		email: "ShafeeqRahman2@gmail.com",
		username: "ShafeeqRahman2",
		friends: [
			'/people/1'
		]
	},
	3: {
		first_name: "Shafeeq3",
		last_name: "Rahman3",
		id: 3,
		email: "ShafeeqRahman3@gmail.com",
		username: "ShafeeqRahman3",
		friends: [
			'/people/2',
			'/people/4'
		]
	},
	4: {
		first_name: "Shafeeq4",
		last_name: "Rahman4",
		id: 4,
		email: "ShafeeqRahman4@gmail.com",
		username: "ShafeeqRahman4",
		friends: [
			'/people/1',
			'/people/3'
		]
	}
}

app.get('/people/:id', function(req, res) {
	res.send(data[req.params.id]);
});

app.listen(3000, function() {
	console.log("Started @3000");
});
