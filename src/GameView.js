/* eslint arrow-body-style: 0 */
class GameView {
  constructor(game) {
    this._game = game
    this._humanPlayerName = this._game.playerName()
  }

  // Clean up this method
  render(container) {
    const cards = this._game.findPlayer(this._humanPlayerName).cards()
    const div = document.createElement('div')
    const botHTML = this._game.botNames().map((name) => {
      return `
      <h3>${name}</h3>
      ${cards.map(card => '<img src="public/img/cards/backs_red.png"/>')}
      `
    })
    const cardImages = cards.map(card => `<img src="public/img/cards/${card.imagePath()}.png" />`)
    const gameView = `
      ${botHTML.join('')}
      <h2>${this._humanPlayerName}</h2>
      ${cardImages.join('')}
    `
    div.innerHTML = gameView
    container.appendChild(div)
  }
}
