var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
suits = ["Hearts", "Clubs", "Diamonds", "Spades"];

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

class Deck {
    constructor() {
        let newDeck = [];
        ranks.forEach(rank => {
            suits.forEach(suit => {
                newDeck.push(new Card(rank, suit));
            })
        });
        this.cards = newDeck;
    }

    shuffle() {
        let currentIndex = this.cards.length, temporaryValue, randomIndex;
        while(currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex--);

            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
        return this;
    }

    drawCard() {
        let topCard = this.cards.shift();
        return topCard;
    }

    drawCards({numCards}) {
        let output = [];
        for (let i = 0; i < numCards; i++) {
            output.push(this.cards.shift());
        }
        return output;
    }
}

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
