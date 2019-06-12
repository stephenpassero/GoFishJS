class OpponentView {
  constructor(name, cards, pairs, selectedOpponent) {
    this._name = name
    this._cards = cards
    this._pairs = pairs
    this._selectedOpponent = selectedOpponent
  }

  getSelected() {
    const opponentMarkup = `<h3>${this._name}</h3>
    ${this._cards.map(card => '<img class="cardBack" src="public/img/cards/backs_red.png"/>').join('')}`
    if (this._selectedOpponent === this._name) {
      return `
      <div class="opponent selected" id="${this._name}">
        ${opponentMarkup}
      </div>
      `
    }
    return `
    <div class="opponent" id="${this._name}">
      ${opponentMarkup}
    </div>
    `
  }

  render(container) {
    const div = document.createElement('div')
    // Eventually render pairs here - Don't forget to write tests
    const opponent = this.getSelected()
    div.innerHTML = opponent
    container.appendChild(div)
  }
}
