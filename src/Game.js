/* eslint no-undef: 0 */
class Game {
  constructor(playerName, totalPlayers) {
    this._playerName = playerName
    this._botNames = []
    for (let i = 0; i < totalPlayers - 1; i++) {
      // Makes the first bot be player2
      this._botNames.push(`Player${i + 2}`)
    }
    this._players = {}
    this._deck = new Deck()
    this._deck.shuffle()
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
