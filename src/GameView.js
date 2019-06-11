/* eslint arrow-body-style: 0 */
class GameView {
  constructor(playerName, ...botNames) {
    this._playerName = playerName
    this._botNames = botNames
  }

  render(container, cards) {
    const div = document.createElement('div')
    const botHTML = this._botNames.map((name) => {
      return `
      <h3>${name}</h3>
      ${cards.map(card => '<img src="public/img/cards/backs_red.png"/>')}
      `
    })
    const cardImages = cards.map(card => `<img src="public/img/cards/${card.imagePath()}.png" />`)
    const gameView = `
      ${botHTML.join('')}
      <h2>${this._playerName}</h2>
      ${cardImages.join('')}
    `
    div.innerHTML = gameView
    container.appendChild(div)
  }
}
