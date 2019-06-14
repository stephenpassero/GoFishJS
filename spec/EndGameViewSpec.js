/* eslint no-undef: 0 */
describe('EndGameView', () => {
  beforeEach(() => {
    game = new Game('HumanPlayer', 3)
    game.startGame()
    // Setting the pairs for each player
    game.players().player2._pairs = ['', '']
    game.players().humanplayer._pairs = ['', '', '', '', '']
    game.players().player3._pairs = ['', '', '', '']
    endGameView = new EndGameView(game)
    container = document.createElement('div')
    document.body.appendChild(container)
    endGameView.render(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('shows the players of the game and points of the game', () => {
    const standing = document.querySelector('h3')
    expect(standing.textContent).toEqual('HumanPlayer: 5 points')
  })
})
