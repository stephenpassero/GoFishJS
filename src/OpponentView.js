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

  pairedCards() {
    return `
      <div class='pairedCards'>
        ${this.ranksToImg(this._pairedRanks).join('')}
      </div>
    `
  }

  opponentMarkup() {
    return `
      <h3>${this._name}</h3>
      ${this._cards.map(card => '<img class="cardBack" src="public/img/cards/backs_red.png"/>').join('')}
    `
  }

  renderOpponentDiv(classes) {
    return `
      <div class="${classes}" id="${this._name}">
        ${this.opponentMarkup()}
        ${this.pairedCards()}
      </div>
    `
  }

  render() {
    if (this._selectedOpponent === this._name) {
      return this.renderOpponentDiv('opponent selected')
    }
    return this.renderOpponentDiv('opponent')
  }
}
