const Player = require('../player.js')
const Blackjack = require('../blackjack.js')
const CardDeck = require('../carddeck.js')

describe('blackjack', () => {
  it('adding a player', () => {
    const cardDeck = new CardDeck()
    const blackjack = new Blackjack(cardDeck)

    const result = blackjack.addPlayerToGame(1, 'playerOne', 1000)

    expect(result).toEqual(new Player(1, 'playerOne', 1000))
    expect(blackjack.playerArray.length).toEqual(1)
  })

  it('adding 2 players', () => {
    const cardDeck = new CardDeck()
    const blackjack = new Blackjack(cardDeck)

    blackjack.addPlayerToGame(1, 'playerOne', 1000)
    blackjack.addPlayerToGame(2, 'playerTwo', 5000)

    const result = blackjack.playerArray

    expect(result).toEqual([
      new Player(1, 'playerOne', 1000),
      new Player(2, 'playerTwo', 5000)
    ])

    expect(blackjack.playerArray.length).toEqual(2)
  })

  it('set up a hand for player', () => {
    const cardDeck = new CardDeck()
    const newCardDeck = cardDeck.createDeck()
    const blackjack = new Blackjack(cardDeck)
    const playerOne = blackjack.addPlayerToGame(1, 'playerOne', 1000)

    console.log(cardDeck)

    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(1)
    console.log(playerOne.hand)

    expect(playerOne.hand.length).toEqual(2)
  })
})
