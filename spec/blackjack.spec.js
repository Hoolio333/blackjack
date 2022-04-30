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

  it('adding a dealer', () => {
    const cardDeck = new CardDeck()
    const blackjack = new Blackjack(cardDeck)

    const result = blackjack.addDealer()

    expect(result).toEqual(new Dealer())
  })

  it('adding a dealer and a player', () => {
    const cardDeck = new CardDeck()
    const blackjack = new Blackjack(cardDeck)

    blackjack.addPlayerToGame(1, 'playerOne', 1000)
    const result = blackjack.addDealer()

    expect(result).toEqual(new Dealer())
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

  it('set-up hand for Player', () => {
    const blackjack = new Blackjack()
    const playerOne = blackjack.addPlayerToGame(1, 'playerOne', 1000)

    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(1)

    expect(blackjack.playerArray.length).toEqual(1)
    expect(playerOne.hand.length).toEqual(2)
    expect(blackjack.deck.cardDeck.length).toEqual(50)
  })

  it('set-up hand for Player that does not exist', () => {
    const blackjack = new Blackjack()
    const playerTwo = blackjack.addPlayerToGame(2, 'playerOne', 1000)

    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(1)

    expect(blackjack.playerArray.length).toEqual(1)
    expect(playerTwo.hand.length).toEqual(0)
    expect(blackjack.deck.cardDeck.length).toEqual(52)
  })

  it('deal a card to the dealer', () => {
    const blackjack = new Blackjack()
    const dealer = blackjack.addDealer()

    blackjack.dealACardToDealer()

    expect(dealer.hand.length).toEqual(1)
    expect(blackjack.deck.cardDeck.length).toEqual(51)
  })

  it('set up a full game with 2 players', () => {
    const blackjack = new Blackjack()
    const dealer = blackjack.addDealer()
    const playerOne = blackjack.addPlayerToGame(1, 'playerOne', 1000)
    const playerTwo = blackjack.addPlayerToGame(2, 'playerOne', 1000)

    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(2)
    blackjack.dealACardToAPlayerID(2)
    blackjack.dealACardToDealer()
    blackjack.dealACardToDealer()

    expect(dealer.hand.length).toEqual(2)
    expect(playerOne.hand.length).toEqual(2)
    expect(playerTwo.hand.length).toEqual(2)
    expect(blackjack.deck.cardDeck.length).toEqual(46)
  })

  it('set-up hand for two Players', () => {
    const blackjack = new Blackjack()
    const playerOne = blackjack.addPlayerToGame(1, 'playerOne', 1000)
    const playerTwo = blackjack.addPlayerToGame(2, 'playerOne', 1000)

    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(1)
    blackjack.dealACardToAPlayerID(2)
    blackjack.dealACardToAPlayerID(2)

    expect(blackjack.playerArray.length).toEqual(2)
    expect(playerOne.hand.length).toEqual(2)
    expect(playerTwo.hand.length).toEqual(2)
    expect(blackjack.deck.cardDeck.length).toEqual(48)
  })

  it('count the value of a hand with one card (hard coded)', () => {
    const blackjack = new Blackjack()

    const score = blackjack.countScore([{ number: 8, suit: 'diamonds' }])

    expect(score).toEqual(8)
  })

  it('count the value of a hand with two cards (hard coded)', () => {
    const blackjack = new Blackjack()

    const score = blackjack.countScore([
      { number: 8, suit: 'diamonds' },
      { number: 4, suit: 'spades' }
    ])

    expect(score).toEqual(12)
  })

  it('count the value of a hand with two cards which are J,Q,K (hard coded)', () => {
    const blackjack = new Blackjack()

    const score = blackjack.countScore([
      { number: 12, suit: 'diamonds' },
      { number: 13, suit: 'spades' }
    ])

    expect(score).toEqual(20)
  })

  it('count the value of a hand with one card that is an ace (hard coded)', () => {
    const blackjack = new Blackjack()

    const score = blackjack.countScore([{ number: 14, suit: 'diamonds' }])

    expect(score).toEqual(11)
  })

  it('count the value of a hand with two cards that are aces (hard coded)', () => {
    const blackjack = new Blackjack()

    const score = blackjack.countScore([
      { number: 14, suit: 'diamonds' },
      { number: 14, suit: 'spades' }
    ])

    expect(score).toEqual(12)
  })

  it('count the value of a hand with aces and JQKs(hard coded)', () => {
    const blackjack = new Blackjack()

    const score = blackjack.countScore([
      { number: 14, suit: 'diamonds' },
      { number: 14, suit: 'spades' },
      { number: 13, suit: 'spades' },
      { number: 12, suit: 'spades' },
      { number: 10, suit: 'spades' }
    ])

    expect(score).toEqual(32)
  })

  it('compare playerOne hand to Dealer hand to see who wins (player wins)', () => {
    const blackjack = new Blackjack()
    const dealerHand = [
      { number: 6, suit: 'diamonds' },
      { number: 12, suit: 'spades' }
    ]
    const playerHand = [
      { number: 11, suit: 'diamonds' },
      { number: 13, suit: 'spades' }
    ]

    const result = blackjack.doesPlayerWin(dealerHand, playerHand)

    expect(result).toEqual(true)
  })

  it('compare playerOne hand to Dealer hand to see who wins (dealer wins)', () => {
    const blackjack = new Blackjack()
    const dealerHand = [
      { number: 11, suit: 'diamonds' },
      { number: 13, suit: 'spades' }
    ]
    const playerHand = [
      { number: 6, suit: 'diamonds' },
      { number: 12, suit: 'spades' }
    ]

    const result = blackjack.doesPlayerWin(dealerHand, playerHand)

    expect(result).toEqual(false)
  })

  it('compare playerOne hand to Dealer hand to see who wins (player goes bust)', () => {
    const blackjack = new Blackjack()
    const dealerHand = [
      { number: 6, suit: 'diamonds' },
      { number: 12, suit: 'spades' }
    ]
    const playerHand = [
      { number: 11, suit: 'diamonds' },
      { number: 4, suit: 'spades' },
      { number: 8, suit: 'spades' }
    ]

    const result = blackjack.doesPlayerWin(dealerHand, playerHand)

    expect(result).toEqual(false)
  })

  it('compare playerOne hand to Dealer hand to see who wins (dealer goes bust)', () => {
    const blackjack = new Blackjack()
    const dealerHand = [
      { number: 11, suit: 'diamonds' },
      { number: 4, suit: 'spades' },
      { number: 8, suit: 'spades' }
    ]
    const playerHand = [
      { number: 6, suit: 'diamonds' },
      { number: 12, suit: 'spades' }
    ]

    const result = blackjack.doesPlayerWin(dealerHand, playerHand)

    expect(result).toEqual(true)
  })

  it('compare playerOne hand to Dealer hand to see who wins (both go bust)', () => {
    const blackjack = new Blackjack()
    const dealerHand = [
      { number: 11, suit: 'diamonds' },
      { number: 4, suit: 'spades' },
      { number: 8, suit: 'spades' }
    ]
    const playerHand = [
      { number: 11, suit: 'spades' },
      { number: 4, suit: 'diamonds' },
      { number: 8, suit: 'diamonds' }
    ]

    const result = blackjack.doesPlayerWin(dealerHand, playerHand)

    expect(result).toEqual(false)
  })

  it('player gets blackjack', () => {
    const blackjack = new Blackjack()
    const playerHand = [
      { number: 14, suit: 'spades' },
      { number: 11, suit: 'diamonds' }
    ]

    const result = blackjack.isTwentyOne(playerHand)

    expect(result).toEqual(Blackjack)
  })

  it('player gets blackjack', () => {
    const blackjack = new Blackjack()
    const playerHand = [
      { number: 14, suit: 'spades' },
      { number: 5, suit: 'diamonds' },
      { number: 5, suit: 'spades' }
    ]

    const result = blackjack.isTwentyOne(playerHand)

    expect(result).toEqual(true)
  })
})
