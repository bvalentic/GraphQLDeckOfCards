const Card = require('./card');

class Deck {

    ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    suits = ["Hearts", "Clubs", "Diamonds", "Spades"];

    constructor() {
        let newDeck = [];
        this.ranks.forEach(rank => {
            this.suits.forEach(suit => {
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
        if (this.cards.length > 1) {
            let topCard = this.cards.shift();
            return topCard;
        }
    }

    drawCards({numCards}) {
        let output = [];
        for (let i = 0; i < numCards; i++) {
            if(i < this.cards.length) {
                output.push(this.cards.shift());
            }
        }
        return output;
    }
}

module.exports = Deck
