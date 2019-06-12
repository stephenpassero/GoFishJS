class Player {
  constructor(name) {
    this._name = name
    this._cards = []
    this._pairs = []
  }

  cards() {
    return this._cards
  }

  name() {
    return this._name
  }

  setHand(...cards) {
    this._cards = cards
  }

  cardsLeft() {
    return this._cards.length
  }

  pairs() {
    return this._pairs
  }

  cardsInHand(rank) {
    return this._cards.filter(card => card.rank() === rank)
  }

  pairCards() {
    this._cards.forEach((originalCard) => {
      const sameRank = this._cards.filter(card => card.rank() === originalCard.rank())
      if (sameRank.length === 4) {
        this._pairs.push(sameRank[0].rank())
        this._cards = this._cards.filter(card => !sameRank.includes(card))
      }
    })
  }

  addCards(...cards) {
    this._cards = this._cards.concat(cards)
  }

  removeCardsByRank(rank) {
    this._cards = this._cards.filter(card => card.rank() !== rank)
  }
}
