describe('Card', () => {
  it('has a rank and a suit', () => {
    const card = new Card('J', 'Spades') // eslint-disable-line no-undef
    expect(card.rank()).toEqual('J')
  })

  it('has a suit', () => {
    const card = new Card('J', 'Spades') // eslint-disable-line no-undef
    expect(card.suit()).toEqual('Spades')
  })
})
