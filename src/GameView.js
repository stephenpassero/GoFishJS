/* eslint arrow-body-style: 0 */
class GameView {
  constructor(game) {
    this._game = game
    this._humanPlayerName = this._game.playerName()
    this._cardSelected = ''
    this._opponentSelected = ''
  }

  cardClicked(card, cards) {
    cards.forEach(card => card.classList.remove('selected'))
    card.classList.add('selected')
    const rank = card.name
    this._cardSelected = rank
    console.log(this._cardSelected)
  }

  opponentClicked(opponentDiv, allDivs) {
    allDivs.forEach(div => div.classList.remove('selected'))
    opponentDiv.classList.add('selected')
    const name = opponentDiv.id
    this._opponentSelected = name
    console.log(this._opponentSelected)
  }

  getCardImages(playerName) {
    const cards = this._game.findPlayer(playerName).cards()
    return cards.map(card => `<img class="card" name="${card.rank()}" src="public/img/cards/${card.imagePath()}.png" />`)
  }

  addHighlightOnClick() {
    const cardsImages = document.querySelectorAll('.card')
    for (const card of cardsImages) {
      card.onclick = this.cardClicked.bind(this, card, cardsImages)
    }
    const opponentsDiv = document.querySelectorAll('.opponent')
    for (const opponentDiv of opponentsDiv) {
      opponentDiv.onclick = this.opponentClicked.bind(this, opponentDiv, opponentsDiv)
    }
  }

  // Clean up this method
  render(container) {
    // Re-render this when the user picks a card and an opponent
    const div = document.createElement('div')
    let opponentView
    const botHTML = this._game.botNames().map((name) => {
      const player = this._game.findPlayer(name)
      opponentView = new OpponentView(name, player.cards(), player.pairs())
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
