const Card = require('./card')
// const Blackjack = require('./blackjack')

const numbers = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10
}

const suits = ['clubs', 'diamonds', 'hearts', 'spades']

class CardDeck {
  constructor(cardDeck) {
    this.cardDeck = []
  }

  createDeck() {
    // loop through suits
    for (let i = 0; i < suits.length; i++) {
      //loop through numbers
      for (let j = 2; j < 15; j++) {
        let card = new Card(j, suits[i])
        this.cardDeck.push(card)
      }
    }
    return this.cardDeck
  }

  dealCard() {
    // measure how many cards are in the deck
    const cardsRemaining = this.cardCount()
    if (cardsRemaining > 0) {
      //randomise the chance of getting a card 1/52, then 1/51
      const randomIndex = Math.floor(Math.random() * cardsRemaining)
      const cardToDeal = this.cardDeck[randomIndex]
      // console.log(cardToDeal)
      this.cardDeck.splice(randomIndex, 1)
      // console.log(this.cardDeck)
      return cardToDeal
    }
    return false
  }

  cardCount() {
    const cardsRemaining = this.cardDeck.length
    return cardsRemaining
  }

  searchForACard(card) {}
}
// function (card) { return card.suit === cardDealt.suit && card.number === cardDealt.number }

module.exports = CardDeck
