/* eslint arrow-body-style: 0 */
class GameView {
  constructor(game) {
    this._game = game
    this._humanPlayerName = this._game.playerName()
    this._selectedCard = ''
    this._selectedOpponent = ''
    this._container = ''
  }

  cardClicked(card) {
    this._selectedCard = card.name
    this._container.innerHTML = ''
    this.render(this._container)
  }

  opponentClicked(opponentDiv) {
    this._selectedOpponent = opponentDiv.id
    this._container.innerHTML = ''
    this.render(this._container)
  }

  getCardImages(playerName) {
    const cards = this._game.findPlayer(playerName).cards()
    return cards.map((card) => {
      if (card.rank() === this._selectedCard) {
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

  // Clean up this method
  render(container) {
    this._container = container
    // Re-render this when the user picks a card and an opponent
    const div = document.createElement('div')
    let opponentView
    const botHTML = this._game.botNames().map((name) => {
      const player = this._game.findPlayer(name)
      opponentView = new OpponentView(name, player.cards(), player.pairs(), this._selectedOpponent)
      return opponentView.render(container)
    })
    const cardImages = this.getCardImages(this._humanPlayerName)
    const gameView = `
      ${botHTML.join('')}
      <div class="human">
        <h2>${this._humanPlayerName}</h2>
        ${cardImages.join('')}
      </div>
    `
    div.innerHTML = gameView
    container.appendChild(div)
    this.addHighlightOnClick()
  }
}
