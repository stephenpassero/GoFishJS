describe('Game', () => {
  let game
  beforeEach(() => {
    game = new Game('Me', 3)
    game.startGame()
  })

  it('creates a deck', () => {
    expect(game.deck()).not.toEqual(undefined)
  })

  it('creates players', () => {
    expect(game.players()).not.toEqual(undefined)
  })

  it('deals 5 cards to those players', () => {
    const player = game.players().me
    expect(player.cardsLeft()).toEqual(5)
  })
})
