class GameView {
  constructor(playerName, totalPlayers) {
    this._playerName = playerName
    this._botNames = []
    for (let i = 0; i < totalPlayers - 1; i++) {
      // Makes the first bot be player2
      this._botNames.push(`Player${i + 2}`)
    }
  }

  render(container) {
    const div = document.createElement('div')
    const botHTML = this._botNames.map(name => `<h3>${name}</h3>`)
    debugger
    const text = `
      <h2>${this._playerName}</h2>
      ${botHTML.join('')}
    `
    div.innerHTML = text
    container.appendChild(div)
  }
}
