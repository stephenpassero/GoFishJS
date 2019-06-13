/* eslint no-undef: 0 */
describe('GameView', () => {
  beforeEach(() => {
    game = new Game('A Cool Person', 2)
    game.startGame()
    gameView = new GameView(game)
    container = document.createElement('div')
    document.body.appendChild(container)
    gameView.render(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('#render', () => {
    it('shows the player and the correct number of bots', () => {
      expect(document.body.querySelector('h2').textContent).toEqual('A Cool Person')
      expect(document.body.querySelectorAll('h3').length).toEqual(1)
    })

    it('shows the correct number of cards', () => {
      const cardsOnScreen = document.querySelectorAll('img').length
      // 4 players with 5 cards each: 2 * 5 = 10 + 1 card to represent the deck = 11
      expect(cardsOnScreen).toEqual(11)
    })

    it('highlights a card when the card is clicked', () => {
      document.querySelector('.card').click()
      expect(document.querySelector('.card').classList).toContain('selected')
    })

    it('shows a game log', () => {
      const card = document.querySelector('.card')
      const opponent = document.querySelector('h3')
      card.click()
      opponent.click()
      const requestCardsButton = document.querySelector('button')
      requestCardsButton.click()
      const gameLog = document.querySelector('.log')
      expect(gameLog.innerHTML).not.toEqual('')
    })

    it('shows paired cards', () => {
      const card1 = new Card('3', 'Hearts')
      const card2 = new Card('3', 'Diamonds')
      const card3 = new Card('3', 'Spades')
      const card4 = new Card('3', 'Clubs')
      const player = game.findPlayer('A Cool Person')
      player.setHand(card1, card2, card3, card4)
      player.pairCards()
      const pairedCards = document.querySelectorAll('.pairedCard')
      // expect(pairedCards.length).toBeGreaterThan(0)
    })

    it('requests cards from other players', () => {
      const card = document.querySelector('.card')
      const opponent = document.querySelector('h3')
      card.click()
      opponent.click()
      const requestCardsButton = document.querySelector('button')
      requestCardsButton.click()
      const human = document.querySelector('.human')
      // Finds all the card images
      const humanCards = [...human.children].filter(element => element.tagName.toLowerCase() === 'img')
      expect(humanCards.length).toBeGreaterThan(5)
    })
  })
})
