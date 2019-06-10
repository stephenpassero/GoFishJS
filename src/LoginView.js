class LoginView {
  constructor(onLogin) {
    this._onLogin = onLogin
  }

  submit(event) {
    event.preventDefault()
    this._onLogin(this.nameInput().value, parseFloat(this.totalPlayersInput().value))
  }

  nameInput() {
    return document.getElementById('playerName')
  }

  totalPlayersInput() {
    return document.getElementById('totalPlayers')
  }

  submitButton() {
    return document.getElementById('submit')
  }

  render(container) {
    const div = document.createElement('div')
    const form = `
      <form>
        <label for="playerName">Player Name</label>
        <input type="text" id="playerName"/>
        <label for="playerName">Number of Players</label>
        <input type="text" id="totalPlayers"/>
        <input type="submit" value="Submit" id="submit"/>
      </form>
    `
    div.innerHTML = form
    div.onsubmit = this.submit.bind(this)
    container.appendChild(div)
  }
}
