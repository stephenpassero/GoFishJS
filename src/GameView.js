/* eslint arrow-body-style: 0 */
class GameView {
  constructor(game, endGame) {
    this._game = game
    this._humanPlayerName = this._game.playerName()
    this._selectedRank = ''
    this._selectedOpponent = ''
    this._container = ''
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

  addHighlightOnClick() {
    const cardsImages = document.querySelectorAll('.card')
    for (const card of cardsImages) {
      card.onclick = this.cardClicked.bind(this, card)
    }
    const opponentsDiv = document.querySelectorAll('.opponent')
    for (const opponentDiv of opponentsDiv) {
      opponentDiv.onclick = this.opponentClicked.bind(this, opponentDiv)
    }
  }

  renderSubmitButton() {
    if (this._selectedOpponent !== '' && this._selectedRank !== '') {
      return '<button class="requestCards">Request Cards</button>'
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

  getBotHTML() {
    let opponentView
    return this._game.botNames().map((name) => {
      const player = this._game.findPlayer(name)
      opponentView = new OpponentView(name, player.cards(), player.pairs(), this._selectedOpponent)
      return opponentView.render()
    })
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
      return '<button class="nextRound">Run Next Round</button>'
    }
    return ''
  }

  nextRound() {
    const playerName = Object.keys(this._game.players())[this._game.playerTurn() - 1]
    this._game.skipRound()
    this.resetAndRender(this._container)
  }

  setNextRoundHandler() {
    const nextRoundButton = document.querySelector('.nextRound')
    if (nextRoundButton) {
      nextRoundButton.onclick = this.nextRound.bind(this)
    }
  }

  checkGameOver() {
    const playerCards = [...document.querySelectorAll('.card')]
    const totalCards = playerCards.concat([...document.querySelectorAll('.cardBack')])
    if (totalCards.length === 0) {
      this._endGame()
    }
  }

  render(container) {
    this._container = container
    const div = document.createElement('div')
    const gameView = `
      <div class="flex-container">
        ${this.getBotHTML().join('')}
      </div>
      ${this.renderDeck()}
      ${this.getHumanPlayerHTML()}
      <div>
        ${this.renderNextRound()}
      </div>
      <div class="buttonDiv">
        ${this.renderSubmitButton()}
      </div>
      <div class="log">
        ${this._game.log().join('<br>')}
      </div>
    `
    div.innerHTML = gameView
    container.appendChild(div)
    this.addHighlightOnClick()
    this.setSubmitRequestHandler()
    this.setNextRoundHandler()
    this.checkGameOver()
  }
}
