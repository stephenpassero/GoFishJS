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

  // I don't really like the player interacting with other player's decks without going through game
  requestCards(player, target, rank) {
    const cards = target.cardsInHand(rank)
    if (cards !== []) {
      target.removeCardsByRank(rank)
      player.addCards(...cards)
    }
    // Not sure if I need this return statement
    return false
  }

  addCards(...cards) {
    // Is there a better way to do this?
    this._cards = this._cards.concat(cards)
  }

  removeCardsByRank(rank) {
    this._cards = this._cards.filter(card => card.rank() !== rank)
  }
}
