const Card = require('./card')

const suits = ['clubs', 'diamonds', 'hearts', 'spades']

class CardDeck {
  constructor() {
    this.cardDeck = []
  }

  createDeck() {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 2; j < 15; j++) {
        const card = new Card(j, suits[i])
        this.cardDeck.push(card)
      }
    }
    return this.cardDeck
  }

  dealCard() {
    const cardsRemaining = this.cardCount()
    if (cardsRemaining > 0) {
      const randomIndex = Math.floor(Math.random() * cardsRemaining)
      const cardToDeal = this.cardDeck[randomIndex]
      this.cardDeck.splice(randomIndex, 1)
      return cardToDeal
    }
    return false
  }

  cardCount() {
    const cardsRemaining = this.cardDeck.length
    return cardsRemaining
  }
}

module.exports = CardDeck
