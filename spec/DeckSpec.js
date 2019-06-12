/* eslint no-undef: 0 */
describe('Deck', () => {
  beforeEach(() => {
    deck = new Deck()
  })

  it('starts with 52 card', () => {
    expect(deck.cardsLeft()).toEqual(52)
  })

  it('can be shuffled', () => {
    const originalCards = [...deck.cards()]
    deck.shuffle()
    expect(deck.cards()).not.toEqual(originalCards)
  })

  describe('#deal', () => {
    it('returns an array of the cards dealt', () => {
      const firstFiveCards = deck.cards().slice(0, 5)
      expect(deck.deal(5)).toEqual(firstFiveCards)
    })

    it('removes the cards it deals', () => {
      deck.deal(10)
      expect(deck.cardsLeft()).toEqual(42)
    })
  })
})
