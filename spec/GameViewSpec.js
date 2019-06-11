/* eslint no-undef: 0 */
describe('GameView', () => {
  describe('#render', () => {
    it('shows the player and the correct number of bots', () => {
      const gameView = new GameView('A Cool Person', 5)
      const container = document.createElement('div')
      document.body.appendChild(container)
      gameView.render(container)
      expect(document.body.querySelector('h2').textContent).toEqual('A Cool Person')
      expect(document.body.querySelectorAll('h3').length).toEqual(4)
      container.remove()
    })
  })
})
