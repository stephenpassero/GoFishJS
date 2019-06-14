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
    const game = new Game(name, numOfPlayers)
    game.startGame()
    const view = new GameView(this.container(), game, this.endGame.bind(this, game))
    view.render()
  }

  endGame(game) {
    const endGameView = new EndGameView(game)
    endGameView.render(this.container())
  }
}

window.controller = new GoFishController()
window.onload = window.controller.login.bind(window.controller)
