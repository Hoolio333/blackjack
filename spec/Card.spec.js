const Card = require('../card.js')

describe('card', () => {
  it('creates a card', () => {
    const card = new Card(7, 'Hearts')
    expect(card.number).toEqual(7)
  })

  it('creates a suit', () => {
    const card = new Card(7, 'Hearts')
    expect(card.suit).toEqual('Hearts')
  })
})
