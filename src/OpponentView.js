class OpponentView {
  constructor(name, cards, pairedRanks, selectedOpponent) {
    this._name = name
    this._cards = cards
    this._pairedRanks = pairedRanks
    this._selectedOpponent = selectedOpponent
  }

  ranksToImg(ranks) {
    const pairs = []
    if (ranks.length !== 0) {
      ranks.forEach((rank) => {
        pairs.push(`<img class="pairedCard" src="public/img/cards/s${rank}.png"/>`)
      })
    }
    return pairs
  }

  render() {
    const opponentMarkup = `<h3>${this._name}</h3>
    ${this._cards.map(card => '<img class="cardBack" src="public/img/cards/backs_red.png"/>').join('')}`
    const pairedCards = `
      <div class='pairedCards'>
        ${this.ranksToImg(this._pairedRanks).join('')}
      </div>
    `

    if (this._selectedOpponent === this._name) {
      return `
        <div class="opponent selected" id="${this._name}">
          ${opponentMarkup}
          ${pairedCards}
        </div>
      `
    }

    return `
      <div class="opponent" id="${this._name}">
        ${opponentMarkup}
        ${pairedCards}
      </div>
    `
  }
}
