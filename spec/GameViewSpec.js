/* eslint no-undef: 0 */
describe('GameView', () => {
  beforeEach(() => {
    game = new Game('A Cool Person', 4)
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
      expect(document.body.querySelectorAll('h3').length).toEqual(3)
    })

    it('shows the correct number of cards', () => {
      const cardsOnScreen = document.querySelectorAll('img').length
      // 4 players with 5 cards each: 4 * 5 = 20
      expect(cardsOnScreen).toEqual(20)
    })

    it('highlights a card when the card is clicked', () => {
      const card = document.querySelector('.card')
      card.click()
      expect(card.classList).toContain('selected')
    })
  })
})
