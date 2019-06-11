class Card {
  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
  }

  rank() {
    return this._rank
  }

  suit() {
    return this._suit
  }

  imagePath() {
    return `${this._suit.charAt(0).toLowerCase()}${this._rank.toLowerCase()}`
  }
}
