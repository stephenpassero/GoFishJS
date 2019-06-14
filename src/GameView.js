/* eslint arrow-body-style: 0 */
class GameView {
  constructor(container, game, endGame) {
    this._game = game
    this._humanPlayerName = game.playerName()
    this._selectedRank = ''
    this._selectedOpponent = ''
    this._container = container
    this._endGame = endGame
  }

  cardClicked(card) {
    this._selectedRank = card.name
    this._container.innerHTML = ''
    this.render(this._container)
  }

  opponentClicked(opponentDiv) {
    this._selectedOpponent = opponentDiv.id
    this._container.innerHTML = ''
    this.render(this._container)
  }

  resetAndRender(container) {
    this._selectedRank = ''
    this._selectedOpponent = ''
    this._container.innerHTML = ''
    this.render(container)
  }

  renderSubmitButton() {
    if (this._selectedOpponent !== '' && this._selectedRank !== '') {
      return `
      <div class="buttonDiv">
        <button class="requestCards">Request Cards</button>
      </div>`
    }
    return ''
  }

  runGameRound() {
    this._game.runRound(this._humanPlayerName, this._selectedOpponent, this._selectedRank)
    this.resetAndRender(this._container)
  }

  setSubmitRequestHandler() {
    const requestCardsButton = document.querySelector('.requestCards')
    if (requestCardsButton) {
      requestCardsButton.onclick = this.runGameRound.bind(this)
    }
  }

  addHighlightOnClickHandler() {
    const cardsImages = document.querySelectorAll('.card')
    for (const card of cardsImages) {
      card.onclick = this.cardClicked.bind(this, card)
    }
    const opponentsDiv = document.querySelectorAll('.opponent')
    for (const opponentDiv of opponentsDiv) {
      opponentDiv.onclick = this.opponentClicked.bind(this, opponentDiv)
    }
  }

  setNextRoundHandler() {
    const nextRoundButton = document.querySelector('.nextRound')
    if (nextRoundButton) {
      nextRoundButton.onclick = this.nextRound.bind(this)
    }
  }

  setHandlers() {
    this.addHighlightOnClickHandler()
    this.setSubmitRequestHandler()
    this.setNextRoundHandler()
  }

  getBotHTML() {
    let opponentView
    return `<div class="flex-container">${this._game.botNames().map((name) => {
      const player = this._game.findPlayer(name)
      opponentView = new OpponentView(name, player.cards(), player.pairs(), this._selectedOpponent)
      return opponentView.render()
    }).join('')}</div>`
  }

  getHumanPlayerHTML() {
    const name = this._humanPlayerName
    const humanPlayerView = new HumanPlayerView(name, this._game, this._selectedRank)
    return humanPlayerView.render()
  }

  renderDeck() {
    if (this._game.deck().cardsLeft() > 0) {
      return `
      <div class="deck">
        <img src="public/img/cards/backs_red.png"/>
      </div>
      `
    }
    return ''
  }

  renderNextRound() {
    const humanPlayer = this._game.findPlayer(this._humanPlayerName)
    if (humanPlayer.cardsLeft() === 0) {
      return '<div><button class="nextRound">Run Next Round</button></div>'
    }
    return ''
  }

  nextRound() {
    const playerName = Object.keys(this._game.players())[this._game.playerTurn() - 1]
    this._game.skipRound()
    this.resetAndRender(this._container)
  }

  checkGameOver() {
    const playerCards = [...document.querySelectorAll('.card')]
    const totalCards = playerCards.concat([...document.querySelectorAll('.cardBack')])
    if (totalCards.length === 0) {
      this._endGame()
    }
  }

  renderGameLog() {
    return `
      <div class="log">
        ${this._game.log().join('<br>')}
      </div>
    `
  }

  gameView() {
    return `
    ${this.getBotHTML()}
    ${this.renderDeck()}
    ${this.getHumanPlayerHTML()}
    ${this.renderNextRound()}
    ${this.renderSubmitButton()}
    ${this.renderGameLog()}`
  }

  render() {
    const div = document.createElement('div')
    div.innerHTML = this.gameView()
    this._container.appendChild(div)
    this.setHandlers()
    this.checkGameOver()
  }
}
