describe('Deck', () => {
  let deck
  beforeEach(() => {
    deck = new Deck() // eslint-disable-line no-undef
  })

  it('starts with 52 card', () => {
    expect(deck.cardsLeft()).toEqual(52)
  })

  it('can be shuffled', () => {
    const originalCards = [...deck.cards()]
    deck.shuffle()
    expect(deck.cards()).not.toEqual(originalCards)
  })

  it('can have cards added to it', () => {
    const card = new Card(1, 'Clubs') // eslint-disable-line no-undef
    const card2 = new Card(8, 'Hearts') // eslint-disable-line no-undef
    deck.add(card, card2)
    expect(deck.cardsLeft()).toEqual(54)
  })

  describe('#deal', () => {
    it('should return an array of the cards dealt', () => {
      const firstFiveCards = deck.cards().slice(0, 5)
      expect(deck.deal(5)).toEqual(firstFiveCards)
    })

    it('should remove the cards it deals', () => {
      deck.deal(10)
      expect(deck.cardsLeft()).toEqual(42)
    })
  })
})
