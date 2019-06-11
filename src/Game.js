/* eslint no-undef: 0 */
class Game {
  constructor(playerName, totalPlayers) {
    this._playerName = playerName
    this._totalPlayers = totalPlayers
    this._botNames = []
    for (let i = 0; i < totalPlayers - 1; i++) {
      // Makes the first bot be player2
      this._botNames.push(`Player${i + 2}`)
    }
    this._players = {}
    this._deck = new Deck()
    this._deck.shuffle()
    this._playerTurn = 1
  }

  playerTurn() {
    return this._playerTurn
  }

  incrementPlayerTurn() {
    this._playerTurn++
    if (this._playerTurn > this._totalPlayers) {
      this._playerTurn = 1
    }
  }

  findPlayer(playerName) {
    return this._players[playerName.toLowerCase()]
  }

  playerName() {
    return this._playerName
  }

  botNames() {
    return this._botNames
  }

  players() {
    return this._players
  }

  deck() {
    return this._deck
  }

  refillCards(...playersToRefill) {
    for (const player of playersToRefill) {
      if (player.cardsLeft() === 0) {
        player.addCards(...this._deck.deal(5))
      }
    }
  }

  requestCards(player, target, rank) {
    const cards = target.cardsInHand(rank)
    if (cards.length !== 0) {
      target.removeCardsByRank(rank)
      player.addCards(...cards)
      return true
    }
    return false
  }

  runRound(playerName, targetName, rank) {
    const player = this.findPlayer(playerName)
    const target = this.findPlayer(targetName)
    // If the target has a card that the player asked for
    if (this.requestCards(player, target, rank)) {
      player.pairCards()
      this.refillCards(player, target)
      this.incrementPlayerTurn()
    } else {
      player.addCards(...this._deck.deal(1))
      this.incrementPlayerTurn()
    }
  }

  startGame() {
    const humanPlayer = new Player(this._playerName)
    this._players[humanPlayer.name().toLowerCase()] = humanPlayer
    for (const botName of this._botNames) {
      this._players[botName.toLowerCase()] = new Player(botName)
    }
    for (const player of Object.values(this._players)) {
      player.addCards(...this._deck.deal(5))
    }
  }
}
