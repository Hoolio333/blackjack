const CardDeck = require('../carddeck.js')

describe('deck', () => {
  it('check that 52 cards have been created', () => {
    const deck = new CardDeck()
    const cards = deck.createDeck()
    expect(cards.length).toEqual(52)
  })

  it('check that the deal card selected one card, then removing the card', () => {
    const deck = new CardDeck()
    deck.createDeck()
    const cardsToDeal = deck.dealCard()
    expect(
      deck.cardDeck.find(
        (card) =>
          card.suit == cardsToDeal.suit && card.number === cardsToDeal.number
      )
    ).toEqual(undefined)
    expect(deck.cardDeck.length).toEqual(51)
  })

  it('check that 52 cards have been created & the 53rd card dealt returns false', () => {
    const deck = new CardDeck()
    deck.createDeck()
    for (let i = 0; i < 52; i++) {
      deck.dealCard()
    }
    const result = deck.dealCard()
    expect(result).toEqual(false)
  })
})

// function find() to check card exists
// loop over the suits & inside that loop, loop over cards
// let expected = true
// break at false & check you never get a false - throw error
