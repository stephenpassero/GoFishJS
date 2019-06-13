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
    const view = new GameView(game, this.endGame.bind(this)) // new GameView
    view.render(this.container())
  }

  endGame(game) {
    const endGameView = new EndGameView(game)
    endGameView.render(this.container())
  }
}

window.controller = new GoFishController()
window.onload = window.controller.login.bind(window.controller)
