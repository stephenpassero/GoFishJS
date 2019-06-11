/* eslint no-undef: 0 */
class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const loginView = new LoginView(this.startGame.bind(this))
    loginView.render(this.container())
  }

  startGame(name, numOfPlayers) {
    const player = '' // new Player
    const game = '' // new Game
    const view = new GameView(name, numOfPlayers) // new GameView
    view.render(this.container())
  }
}

window.controller = new GoFishController()
window.onload = window.controller.login.bind(window.controller)
