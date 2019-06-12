describe('OpponentView', () => {
  describe('#render', () => {
    it('shows the opponent\'s name and number of cards', () => {
      const opponentView = new OpponentView('Player2', ['cardPlaceholder', 'cardPlaceholder']) // eslint-disable-line no-undef
      const container = document.createElement('div')
      document.body.appendChild(container)
      opponentView.render(container)
      const cardsRendered = document.querySelectorAll('.cardBack')
      const name = document.querySelector('h3')
      expect(cardsRendered.length).toEqual(2)
      expect(name.textContent).toEqual('Player2')
      container.remove()
    })
  })
})
