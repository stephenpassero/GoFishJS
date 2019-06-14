class HumanPlayerView {
  constructor(name, game, selectedRank) {
    this._name = name
    this._game = game
    this._selectedRank = selectedRank
  }

  getCard(card) {
    const imgBody = `name="${card.rank()}" src="public/img/cards/${card.imagePath()}.png"`
    if (this._selectedRank === card.rank()) {
      return `<img class="card selected" ${imgBody}/>`
    }
    return `<img class="card" ${imgBody}/>`
  }

  getCardImages(playerName) {
    const cards = this._game.findPlayer(playerName).cards()
    return cards.map(card => this.getCard(card))
  }

  findPairs(playerName) {
    const ranks = this._game.findPlayer(playerName).pairs()
    if (ranks.length !== 0) {
      return ranks.map(rank => `<img class='pairedCard' src="public/img/cards/s${rank}.png"/>`)
    }
  }

  renderPairs() {
    if (this.findPairs(this._name)) {
      return `
      <div class="pairs">
        ${this.findPairs(this._name).join('')}
      <div>
      `
    }
    return ''
  }

  render() {
    return `
    <div class="human">
      <h2>${this._name}</h2>
      ${this.getCardImages(this._name).join('')}
      ${this.renderPairs()}
    </div>
    `
  }
}
