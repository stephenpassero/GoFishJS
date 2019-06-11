class GameView {
  constructor(playerName, ...botNames) {
    this._playerName = playerName
    this._botNames = botNames
  }

  render(container) {
    const div = document.createElement('div')
    const botHTML = this._botNames.map(name => `<h3>${name}</h3>`)
    const text = `
      <h2>${this._playerName}</h2>
      ${botHTML.join('')}
    `
    div.innerHTML = text
    container.appendChild(div)
  }
}
