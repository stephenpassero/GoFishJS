class EndGameView {
  constructor(game) {
    this._game = game
  }

  generateHTMLRankings(rankings) {
    return [...rankings.map(ranking => `<h2>${ranking[0]}: ${ranking[1]} points</h2>`)]
  }

  render(container) {
    container.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('finalRankings')
    const markup = `${this.generateHTMLRankings(this._game.playerPairs()).join('')}`
    div.innerHTML = markup
    container.appendChild(div)
  }
}
