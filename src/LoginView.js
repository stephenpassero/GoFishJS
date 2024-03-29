class LoginView {
  constructor(onLogin) {
    this._onLogin = onLogin
  }

  submit(event) {
    event.preventDefault()
    this._onLogin(this.nameInput().value, parseFloat(this.totalPlayersInput().value))
    document.body.querySelector('form').remove()
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

  form() {
    return `
      <form>
        <label for="playerName">Player Name</label>
        <input type="text" class="textInput" required id="playerName"/>
        <label for="playerName">Number of Players</label>
        <input type="number" class="textInput" min="2" max="6" required id="totalPlayers"/>
        <input type="submit" value="Submit" id="submit"/>
      </form>`
  }

  render(container) {
    const div = document.createElement('div')
    div.innerHTML = this.form()
    div.onsubmit = this.submit.bind(this)
    container.appendChild(div)
  }
}
