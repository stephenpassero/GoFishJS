class Log {
  constructor() {
    this._gameLog = []
  }

  getLog() {
    return this._gameLog.slice(0, 10)
  }

  addLog(player, target, rank, statement) {
    if (statement) {
      this._gameLog.unshift(`${player} ${statement}`)
    } else if (rank) {
      this._gameLog.unshift(`${player} took all the ${rank}s from ${target}`)
    } else {
      this._gameLog.unshift(`${player} went fishing`)
    }
  }
}
