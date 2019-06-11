/* eslint no-undef: 0 */
describe('Player', () => {
  let player
  beforeEach(() => {
    player = new Player('Player1')
  })
  it('has cards', () => {
    expect(player.cards()).not.toEqual(undefined)
  })

  it('can add cards to its hand', () => {
    const card1 = new Card('4', 'Hearts')
    const card2 = new Card('A', 'Spades')
    player.addCards(card1, card2)
    expect(player.cards()).toEqual([card1, card2])
  })

  it('can find all cards of a certain rank in its hand', () => {
    const card1 = new Card('J', 'Spades')
    const card2 = new Card('4', 'Hearts')
    const card3 = new Card('J', 'Diamonds')
    player.addCards(card1, card2, card3)
    expect(player.cardsInHand('J')).toEqual([card1, card3])
  })

  it('can remove cards from its hand', () => {
    const card1 = new Card('4', 'Hearts')
    const card2 = new Card('J', 'Spades')
    const card3 = new Card('J', 'Diamonds')
    player.addCards(card1, card2)
    player.removeCardsByRank(card3.rank())
    expect(player.cards()).toEqual([card1])
  })

  it('can take cards from other players', () => {
    const player2 = new Player('Player2')
    const card1 = new Card('A', 'Spades')
    const card2 = new Card('8', 'Hearts')
    const card3 = new Card('8', 'Clubs')
    player.addCards(card1)
    player2.addCards(card2, card3)
    // requestCards(player, targetPlayer, rank)
    player.requestCards(player, player2, '8')
    expect(player.cardsLeft()).toEqual(3)
    expect(player2.cardsLeft()).toEqual(0)
  })

  it('can pair four cards of the same rank', () => {
    const card1 = new Card('K', 'Hearts')
    const card2 = new Card('K', 'Diamonds')
    const card3 = new Card('K', 'Clubs')
    const card4 = new Card('K', 'Spades')
    const card5 = new Card('5', 'Spades')
    player.addCards(card1, card2, card3, card4, card5)
    player.pairCards()
    expect(player.cardsLeft()).toEqual(1)
    expect(player.pairs()).toEqual(['K'])
  })
})
