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
    const game = new Game(name, numOfPlayers) // new Game
    game.startGame()
    const humanPlayer = game.players()[name.toLowerCase()]
    const view = new GameView(name, ...game.botNames()) // new GameView
    view.render(this.container(), humanPlayer.cards())
  }
}

window.controller = new GoFishController()
window.onload = window.controller.login.bind(window.controller)
