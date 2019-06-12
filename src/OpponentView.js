class OpponentView {
  constructor(name, cards, pairs) {
    this._name = name
    this._cards = cards
    this._pairs = pairs
  }

  render(container) {
    const div = document.createElement('div')
    // Eventually render pairs here - Don't forget to write tests
    const opponent = `
    <div class="opponent" id="${this._name}">
      <h3>${this._name}</h3>
      ${this._cards.map(card => '<img class="cardBack" src="public/img/cards/backs_red.png"/>').join('')}
    </div>
    `
    div.innerHTML = opponent
    container.appendChild(div)
  }
}
