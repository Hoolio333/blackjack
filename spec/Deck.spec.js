const CardDeck = require('../carddeck.js')

describe('deck', () => {
  it('check that 52 cards have been created', () => {
    const deck = new CardDeck()
    const cards = deck.createDeck()
    expect(cards.length).toEqual(52)
  })

  it('check that 52 cards have been created, and three cards have been dealt', () => {
    const deck = new CardDeck()
    const cards = deck.createDeck()
    deck.dealCard()
    deck.dealCard()
    deck.dealCard()
    expect(cards.length).toEqual(49)
  })

  it('check that 52 cards have been created, and 53 cards have been dealt, the last should fail', () => {
    const deck = new CardDeck()
    deck.createDeck()
    for (let i = 0; i < 52; i++) {
      deck.dealCard()
    }
    const result = deck.dealCard()
    expect(result).toEqual(false)
  })

  it('check that the deal card selects one card', () => {
    const deck = new CardDeck()
    deck.createDeck()
    const cardToDeal = deck.dealCard()
    expect(
      deck.cardDeck.find(
        (card) =>
          card.suit === cardToDeal.suit && card.number === cardToDeal.number
      )
    ).toEqual(undefined)
    expect(deck.cardDeck.length).toEqual(51)
  })

  it('check that the deal card selects one card, removing then return the card', () => {
    const deck = new CardDeck()
    deck.createDeck()
    deck.dealCard()
    const cardToDeal = deck.dealCard()
    expect(
      deck.cardDeck.find(
        (card) =>
          card.suit === cardToDeal.suit && card.number === cardToDeal.number
      )
    ).toEqual(undefined)
    expect(deck.cardDeck.length).toEqual(50)
  })
})
