var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const Deck = require('./deck');

var schema = buildSchema(`
    type Card {
        rank: String!
        suit: String!
    }

    type Deck {
        cards: [Card]
        shuffle: Deck
        drawCard: Card
        drawCards(numCards: Int!): [Card]
    }

    type Query {
        health: String
        getDeck: Deck
    }
`);

var root = {
    health: () => {
        return 'Healthy'
    },
    getDeck: () => {
        return new Deck();
    }
}

/* Server logic */

var app = express();
let port = 4000;
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`)
