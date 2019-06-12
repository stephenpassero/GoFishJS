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

  // Clean up this method
  render(container) {
    // Re-render this when the user picks a card and an opponent
    const cards = this._game.findPlayer(this._humanPlayerName).cards()
    const div = document.createElement('div')
    const botHTML = this._game.botNames().map((name) => {
      // This won't always work
      // Refactor this into a seperate view or something
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
      <div class="human">
        <h2>${this._humanPlayerName}</h2>
        ${cardImages.join('')}
      </div>
    `
    div.innerHTML = gameView
    container.appendChild(div)
    const cardsImages = document.querySelectorAll('.card')
    for (const card of cardsImages) {
      card.onclick = this.cardClicked.bind(this, card, cardsImages)
    }
    const opponentsDiv = document.querySelectorAll('.opponent')
    for (const opponentDiv of opponentsDiv) {
      opponentDiv.onclick = this.opponentClicked.bind(this, opponentDiv, opponentsDiv)
    }
  }
}
