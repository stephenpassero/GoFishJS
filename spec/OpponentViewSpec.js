/* eslint no-undef: 0 */
describe('OpponentView', () => {
  describe('#ranksToImg', () => {
    it('can convert a rank to an image path', () => {
      const opponentView = new OpponentView('Player2', ['cardPlaceholder', 'cardPlaceholder'])
      const imgPath = opponentView.ranksToImg(['K'])
      expect(imgPath).toEqual(['<img class="pairedCard" src="public/img/cards/sK.png"/>'])
    })
  })

  describe('#render', () => {
    it('shows the opponent\'s name and number of cards', () => {
      const opponentView = new OpponentView('Player2', ['cardPlaceholder', 'cardPlaceholder'], ['4'])
      const opponentHTML = opponentView.render()
      const numOfCardsRendered = opponentHTML.split('cardBack').length - 1
      expect(numOfCardsRendered).toEqual(2)
      expect(opponentHTML).toContain('Player2')
    })
  })
})
