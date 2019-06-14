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
    this._log = new Log()
  }

  startGame() {
    const humanPlayer = new Player(this._playerName)
    this._players[humanPlayer.name().toLowerCase()] = humanPlayer
    for (const botName of this._botNames) {
      this._players[botName.toLowerCase()] = new Player(botName)
    }
    Object.values(this._players).forEach(player => player.addCards(...this._deck.deal(5)))
  }

  playerPairs() {
    const playerPairs = []
    for (const player of Object.values(this._players)) {
      playerPairs.push([player.name(), player.pairs().length])
    }
    return playerPairs
  }

  playerTurn() {
    return this._playerTurn
  }

  log() {
    return this._log.getLog()
  }

  addLog(player, target, rank, statement) {
    this._log.addLog(player, target, rank, statement)
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
        // Deck.deal() only deal as many cards as it has, so if there is only 3
        // cards left in the deck it will only deal 3 cards
        player.addCards(...this._deck.deal(5))
      }
    }
  }

  generateRandomNum(maxNum) {
    return Math.floor(Math.random() * maxNum)
  }

  findValidPlayerToRequest(bot) {
    // Pick and random player that isn't me and has cards to request a card from
    let playerToRequest = Object.values(this._players)[this.generateRandomNum(this._totalPlayers)]
    while (playerToRequest === bot && playerToRequest.cardsLeft() > 0) {
      playerToRequest = Object.values(this._players)[this.generateRandomNum(this._totalPlayers)]
    }
    return playerToRequest
  }

  runBotTurn(botName) {
    const bot = this.findPlayer(botName)
    if (bot !== undefined && bot.cards() !== undefined && bot.cardsLeft() !== 0) {
      // Pick a random card from my hand
      const rankToRequest = bot.cards()[this.generateRandomNum(bot.cardsLeft())].rank()
      this.runRound(botName, this.findValidPlayerToRequest(bot).name(), rankToRequest)
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

  pairCards(player) {
    const pairedCardRank = player.pairCards()
    if (pairedCardRank) {
      this.addLog(player.name(), '', '', `paired four ${pairedCardRank}s`)
    }
  }

  runBotRounds() {
    while (this._playerTurn !== 1) {
      const botPlayerName = Object.keys(this._players)[this._playerTurn - 1]
      this.runBotTurn(botPlayerName)
    }
  }

  skipRound() {
    this.incrementPlayerTurn()
    this.runBotRounds()
  }

  // TRASH
  runBasicRoundSteps(logOptions, playerToPair, playersToRefill) {
    this.addLog(logOptions[0], logOptions[1], logOptions[2])
    this.pairCards(playerToPair)
    this.refillCards(...playersToRefill)
  }

  goFishing(player) {
    player.addCards(...this._deck.deal(1))
    this.runBasicRoundSteps([player.name()], player, [player])
    this.incrementPlayerTurn()
  }

  // I'm not really sure how to simplify this any more
  runRound(playerName, targetName, rank) {
    const player = this.findPlayer(playerName)
    const target = this.findPlayer(targetName)
    // If the target has a card that the player asked for
    if (this.requestCards(player, target, rank)) {
      this.runBasicRoundSteps([playerName, targetName, rank], player, [player, target])
    } else if (targetName) {
      this.goFishing(player)
    }
    this.runBotRounds()
  }
}
