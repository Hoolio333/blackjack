const Player = require('./player')
const CardDeck = require('./card_deck')
const Dealer = require('./dealer')

const cardValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
  14: 1
}
class Blackjack {
  constructor() {
    this.playerArray = []
    this.deck
    this.createDeck()
    this.dealer
  }

  addDealer() {
    const dealer = new Dealer()
    this.dealer = dealer
    return dealer
  }

  addPlayerToGame(id, playerName, wallet) {
    const player = new Player(id, playerName, wallet)
    this.playerArray.push(player)
    return player
  }

  createDeck() {
    this.deck = new CardDeck()
    this.deck.createDeck()
  }

  dealACardToDealer() {
    const card = this.deck.dealCard()
    return this.dealer.hand.push(card)
  }

  dealACardToAPlayerID(id) {
    for (let i = 0; i < this.playerArray.length; i++) {
      const player = this.playerArray[i]
      if (id === player.id) {
        const card = this.deck.dealCard()
        return player.hand.push(card)
      }
    }
    return false
  }

  countScore(hand) {
    let sum = 0
    let aceIsEleven = false
    let makeElevenAceOne = false
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].number
      const valueOfCard = cardValue[numberOfCard]
      if (this.handHasAce(hand)) {
        if (numberOfCard === 14 && !aceIsEleven) {
          aceIsEleven = true
          sum += 10
        }
        sum += valueOfCard
        if (sum > 21 && !makeElevenAceOne) {
          makeElevenAceOne = true
          sum = sum - 10
        }
      } else sum += valueOfCard
    }
    return sum
  }

  handHasAce(hand) {
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].number
      if (numberOfCard === 14) {
        return true
      }
    }
    return false
  }

  isBust(hand) {
    if (this.countScore(hand) < 22) {
      return false
    }
    return true
  }

  isTwentyOne(hand) {
    if (this.countScore(hand) === 21) {
      if (hand.length === 2) {
        return Blackjack
      } else return true
    } else return false
  }

  doesPlayerWin(dealerHand, playerHand) {
    if (this.isBust(playerHand)) {
      return false
    }
    if (this.isBust(dealerHand)) {
      return true
    }
    if (this.countScore(dealerHand) > this.countScore(playerHand)) {
      return false
    }
    if (this.countScore(dealerHand) < this.countScore(playerHand)) {
      return true
    }
  }
}

module.exports = Blackjack
