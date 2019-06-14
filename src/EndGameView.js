class EndGameView {
  constructor(game) {
    this._game = game
    this._rankings = this._game.playerPairs()
  }

  generateHTMLRankings(rankings) {
    return [...rankings.map(ranking => `<h3 class="rankedItem">${ranking[0]}: ${ranking[1]} points</h3>`)]
  }

  render(container) {
    const div = document.createElement('div')
    div.classList.add('rankings')
    div.innerHTML = `
      ${this.generateHTMLRankings(this._rankings).join('')}
    `
    container.appendChild(div)
  }
}
