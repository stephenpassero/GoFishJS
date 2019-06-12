/* eslint arrow-body-style: 0 */
class GameView {
  constructor(game) {
    this._game = game
    this._humanPlayerName = this._game.playerName()
    this._cardSelected = ''
    this._opponentSelected = ''
  }

  cardClicked(cardRank) {
    this._cardSelected = cardRank
    console.log(this._cardSelected)
  }

  opponentClicked(opponentName) {
    this._opponentSelected = opponentName
    console.log(this._opponentSelected)
  }

  // Clean up this method
  render(container) {
    const cards = this._game.findPlayer(this._humanPlayerName).cards()
    const div = document.createElement('div')
    const botHTML = this._game.botNames().map((name) => {
      return `
      <div class="opponent" id="${name}">
        <h3>${name}</h3>
        ${cards.map(card => '<img src="public/img/cards/backs_red.png"/>').join('')}
      </div>
      `
    })
    const cardImages = cards.map(card => `<img class="card" name="${card.rank()}" src="public/img/cards/${card.imagePath()}.png" />`)
    const gameView = `
      ${botHTML.join('')}
      <div class="humanCards">
        <h2>${this._humanPlayerName}</h2>
        ${cardImages.join('')}
      </div>
    `
    div.innerHTML = gameView
    container.appendChild(div)
    const cardsImage = document.querySelectorAll('.card')
    for (const card of cardsImage) {
      card.onclick = this.cardClicked.bind(this, card.name)
    }
    const opponentsDiv = document.querySelectorAll('.opponent')
    for (const opponentDiv of opponentsDiv) {
      opponentDiv.onclick = this.opponentClicked.bind(this, opponentDiv.id)
    }
  }
}
