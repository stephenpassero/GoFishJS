/* eslint arrow-body-style: 0 */
class GameView {
  constructor(game) {
    this._game = game
    this._humanPlayerName = this._game.playerName()
    this._selectedRank = ''
    this._selectedOpponent = ''
    this._container = ''
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

  getCardImages(playerName) {
    const cards = this._game.findPlayer(playerName).cards()
    return cards.map((card) => {
      if (card.rank() === this._selectedRank) {
        return `<img class="card selected" name="${card.rank()}" src="public/img/cards/${card.imagePath()}.png" />`
      }
      return `<img class="card" name="${card.rank()}" src="public/img/cards/${card.imagePath()}.png" />`
    })
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

  getBotHTML(container) {
    let opponentView
    return this._game.botNames().map((name) => {
      const player = this._game.findPlayer(name)
      opponentView = new OpponentView(name, player.cards(), player.pairs(), this._selectedOpponent)
      return opponentView.render(container)
    })
  }

  render(container) {
    this._container = container
    const div = document.createElement('div')
    const cardImages = this.getCardImages(this._humanPlayerName)
    const gameView = `
      ${this.getBotHTML(container).join('')}
      <div class="human">
        <h2>${this._humanPlayerName}</h2>
        ${cardImages.join('')}
      </div>
      <div class='buttonDiv'>
        ${this.renderSubmitButton()}
      </div>
    `
    div.innerHTML = gameView
    container.appendChild(div)
    this.addHighlightOnClick()
    this.setSubmitRequestHandler()
  }
}
