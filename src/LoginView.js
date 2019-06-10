class LoginView {
  constructor(onLogin) {
    this._onLogin = onLogin
  }

  submit(event) {
    event.preventDefault()
    this._onLogin(this.nameInput().value)
  }

  nameInput() {
    return document.getElementById('playerName')
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
        <input type="submit" value="Submit" id="submit"/>
      </form>
    `
    div.innerHTML = form
    div.onsubmit = this.submit.bind(this)
    container.appendChild(div)
  }
}
