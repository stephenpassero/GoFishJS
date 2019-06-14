/* eslint no-undef: 0 */
describe('HumanPlayerView', () => {
  beforeEach(() => {
    game = new Game('HumanPlayer', 2)
    game.startGame()
    humanPlayerView = new HumanPlayerView('HumanPlayer', game)
    playerView = humanPlayerView.render()
  })

  it('can get the card image of a card object', () => {
    const cardImg = humanPlayerView.getCard(new Card('10', 'Hearts'))
    expect(cardImg).toEqual('<img class="card" name="10" src="public/img/cards/h10.png"/>')
  })

  describe('#render', () => {
    it('shows the player\'s name and cards', () => {
      const markup = humanPlayerView.render()
      const cards = markup.match(/class="card"/g)
      expect(cards.length).toEqual(5)
      expect(playerView).toContain('HumanPlayer')
    })

    it('shows paired cards', () => {
      const card1 = new Card('3', 'Hearts')
      const card2 = new Card('3', 'Diamonds')
      const card3 = new Card('3', 'Spades')
      const card4 = new Card('3', 'Clubs')
      const player = game.findPlayer('HumanPlayer')
      player.setHand(card1, card2, card3, card4)
      player.pairCards()
      const markup = humanPlayerView.renderPairs()
      const pairedCards = markup.match(/.pairedCard/g)
      expect(pairedCards.length).toBeGreaterThan(0)
    })
  })
})
