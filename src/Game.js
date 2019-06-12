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
        if (this._deck.cardsLeft() < 5) {
          player.addCards(...this._deck.deal(this._deck.cardsLeft()))
        } else {
          player.addCards(...this._deck.deal(5))
        }
      }
    }
  }

  generateRandomNum(maxNum) {
    return Math.floor(Math.random() * maxNum)
  }

  runBotTurn(botName) {
    if (botName) {
      const bot = this.findPlayer(botName)
      const rankToRequest = bot.cards()[Math.floor(Math.random() * bot.cardsLeft())].rank()
      let playerToRequest = Object.values(this._players)[this.generateRandomNum(this._totalPlayers)]
      while (playerToRequest === bot) {
        playerToRequest = Object.values(this._players)[this.generateRandomNum(this._totalPlayers)]
      }
      this.runRound(botName, playerToRequest.name(), rankToRequest)
    } else {
      this.incrementPlayerTurn()
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
    if (this.requestCards(player, target, rank) && rank) {
      player.pairCards()
      this.refillCards(player, target)
    } else {
      player.addCards(...this._deck.deal(1))
      player.pairCards()
      this.incrementPlayerTurn()
    }
    if (this._playerTurn !== 1) {
      const botPlayerName = Object.keys(this._players)[this._playerTurn - 1]
      this.runBotTurn(botPlayerName)
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
