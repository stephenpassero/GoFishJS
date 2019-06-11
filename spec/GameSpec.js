/* eslint no-undef: 0 */
describe('Game', () => {
  let game, player, player2
  beforeEach(() => {
    game = new Game('Me', 3)
    game.startGame()
    player = game.findPlayer('Me')
    player2 = game.findPlayer('Player2')
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

  it('can take card from one player and give them to another', () => {
    const card1 = new Card('A', 'Spades')
    const card2 = new Card('8', 'Hearts')
    const card3 = new Card('8', 'Clubs')
    player.setHand(card1)
    player2.setHand(card2, card3)
    // requestCards(player, targetPlayer, rank)
    game.requestCards(player, player2, '8')
    expect(player.cardsLeft()).toEqual(3)
    expect(player2.cardsLeft()).toEqual(0)
  })

  it('should have a number representing the player\'s turn', () => {
    game.incrementPlayerTurn()
    expect(game.playerTurn()).toEqual(2)
    game.incrementPlayerTurn()
    game.incrementPlayerTurn()
    expect(game.playerTurn()).toEqual(1)
  })

  describe('#runRound', () => {
    it('requests cards from other players', () => {
      const card1 = new Card('10', 'Spades')
      const card2 = new Card('10', 'Diamonds')
      player.setHand(card1)
      player2.setHand(card2)
      game.runRound(player.name(), player2.name(), card1.rank())
      const cards = player.cards()
      expect(cards).toEqual([card1, card2])
      expect(player2.cardsLeft()).toEqual(5)
      expect(game.playerTurn()).toEqual(2)
    })

    it('goes fishing when the target doesn\'t have the card asked for', () => {
      const card1 = new Card('10', 'Spades')
      const card2 = new Card('6', 'Diamonds')
      player.setHand(card1)
      player2.setHand(card2)
      game.runRound(player.name(), player2.name(), card1.rank())
      expect(player.cardsLeft()).toEqual(2)
      expect(game.playerTurn()).toEqual(2)
    })
  })
})
